import { test, expect, type Page } from "@playwright/test";

async function speechStub(page: Page) {
  await page.addInitScript(() => {
    type Utterance = {
      text: string;
      rate: number;
      onend?: () => void;
      onerror?: () => void;
      onboundary?: (e: {
        name: string;
        charIndex: number;
        charLength: number;
      }) => void;
    };
    const state = {
      current: null as Utterance | null,
      history: [] as Utterance[],
      paused: false,
      cancels: 0,
    };
    Object.defineProperty(window, "__speech", { value: state });
    Object.defineProperty(window, "SpeechSynthesisUtterance", {
      configurable: true,
      value: class {
        rate = 1;
        constructor(public text: string) {}
      },
    });
    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: {
        speak: (u: Utterance) => {
          state.current = u;
          state.history.push(u);
        },
        cancel: () => {
          state.cancels++;
          state.current = null;
          state.paused = false;
        },
        pause: () => {
          state.paused = true;
        },
        resume: () => {
          state.paused = false;
        },
      },
    });
  });
}
async function preferences(page: Page) {
  await page
    .getByText("Make this chapter comfortable to read", { exact: false })
    .click();
}

for (const width of [1440, 768, 390]) {
  test(`preferences, translations, and previous interactions at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");
    await preferences(page);
    await page.getByLabel("Text size", { exact: true }).selectOption("larger");
    await page.getByLabel("Line spacing").selectOption("spacious");
    await page.getByLabel("Reading width").selectOption("narrow");
    await page.getByLabel("Appearance").selectOption("warm");
    await page.getByLabel("Translation language").selectOption("ja");
    const first = page.locator('[data-paragraph-id="p3"]');
    const english = await first.locator(".paragraph-original").innerText();
    await first.getByRole("button", { name: "Translate" }).click();
    await expect(first.locator('[lang="ja"]')).toContainText("酢と重曹");
    await expect(first.locator(".paragraph-original")).toHaveText(english);
    const terminology = page.locator('[data-paragraph-id="p4"]');
    await terminology.getByRole("button", { name: "Translate" }).click();
    await expect(terminology.locator('[lang="ja"]')).toContainText("reactants");
    await page.getByLabel("Translation language").selectOption("es");
    await expect(terminology.locator('[lang="es"]')).toContainText(
      "reactivos (reactants)",
    );
    await first.getByRole("button", { name: "Hide translation" }).click();
    await expect(first.locator(".paragraph-translation")).toBeHidden();
    await expect(first.locator(".paragraph-original")).toHaveCSS(
      "font-size",
      "20px",
    );
    await expect(first.locator(".paragraph-original")).toHaveCSS(
      "line-height",
      "44px",
    );
    const originalWidth = await first.evaluate(
      (el) => el.getBoundingClientRect().width,
    );
    expect(originalWidth).toBeLessThan(1000);
    await page.reload();
    await preferences(page);
    await expect(page.getByLabel("Text size", { exact: true })).toHaveValue(
      "larger",
    );
    await expect(page.getByLabel("Appearance")).toHaveValue("warm");
    await page.getByLabel("Appearance").selectOption("contrast");
    await expect(first.locator(".paragraph-original")).toHaveCSS(
      "color",
      "rgb(16, 26, 18)",
    );
    await page
      .getByRole("button", { name: "Define reactants", exact: true })
      .click();
    await expect(page.getByRole("dialog")).toContainText("starting substances");
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Define reactants", exact: true }),
    ).toBeFocused();
    const explanation = page.locator(".explanation").first();
    await explanation.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(
      explanation.locator(".supported-paragraph").first(),
    ).toBeVisible();
    for (const detail of await page.locator(".explanation").all()) {
      if ((await detail.getAttribute("open")) === null)
        await detail.locator("summary").click();
    }
    await expect(page.locator(".supported-paragraph")).toHaveCount(17);
    for (const paragraph of await page.locator(".supported-paragraph").all()) {
      if (!(await paragraph.locator(".paragraph-translation").isVisible()))
        await paragraph.getByRole("button", { name: "Translate" }).click();
      await expect(paragraph.locator(".paragraph-translation")).toBeVisible();
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
    await page.getByRole("button", { name: "Reset preferences" }).click();
    await expect(page.getByLabel("Text size", { exact: true })).toHaveValue(
      "standard",
    );
    await expect(page.getByLabel("Appearance")).toHaveValue("paper");
    expect(errors).toEqual([]);
  });
}

test("speech controls, switching paragraphs, speed, highlighting, finish and failure", async ({
  page,
}) => {
  await speechStub(page);
  await page.goto("/");
  await preferences(page);
  const first = page.locator('[data-paragraph-id="p3"]');
  const second = page.locator('[data-paragraph-id="p4"]');
  await first.getByRole("button", { name: "Listen", exact: true }).click();
  await expect(first).toHaveClass(/is-speaking/);
  expect(await page.evaluate(() => window.speechSynthesis !== undefined)).toBe(
    true,
  );
  await first.getByRole("button", { name: "Pause", exact: true }).click();
  await expect(
    first.getByRole("button", { name: "Resume", exact: true }),
  ).toBeVisible();
  await first.getByRole("button", { name: "Resume", exact: true }).click();
  await first.getByRole("button", { name: "Replay", exact: true }).click();
  await page.getByLabel("Reading speed").selectOption("1.5");
  const speech = () =>
    page.evaluate(() => {
      const s = (
        window as unknown as {
          __speech: {
            current: { text: string; rate: number } | null;
            paused: boolean;
            history: unknown[];
          };
        }
      ).__speech;
      return {
        text: s.current?.text,
        rate: s.current?.rate,
        paused: s.paused,
        count: s.history.length,
      };
    });
  expect(await speech()).toMatchObject({ rate: 1.5, paused: false });
  await second.getByRole("button", { name: "Listen", exact: true }).click();
  await expect(first).not.toHaveClass(/is-speaking/);
  expect((await speech()).text).toContain("reactants.");
  expect((await speech()).text).not.toContain("Define");
  await page.evaluate(() => {
    const s = (
      window as unknown as {
        __speech: { current: { onboundary: (e: unknown) => void } };
      }
    ).__speech;
    s.current.onboundary({ name: "word", charIndex: 0, charLength: 6 });
  });
  expect(await page.evaluate(() => CSS.highlights.has("spoken-word"))).toBe(
    true,
  );
  // A late completion from a canceled utterance must not stop the new one.
  await page.evaluate(() => {
    const s = (
      window as unknown as { __speech: { history: { onend: () => void }[] } }
    ).__speech;
    s.history[0].onend();
  });
  await expect(second).toHaveClass(/is-speaking/);
  await second.getByRole("button", { name: "Stop", exact: true }).click();
  await expect(second).not.toHaveClass(/is-speaking/);
  expect(await page.evaluate(() => CSS.highlights.has("spoken-word"))).toBe(
    false,
  );
  await first.getByRole("button", { name: "Listen", exact: true }).click();
  await page.evaluate(() => {
    (
      window as unknown as { __speech: { current: { onend: () => void } } }
    ).__speech.current.onend();
  });
  await expect(page.getByRole("status")).toContainText("Paragraph finished");
  await first.getByRole("button", { name: "Listen", exact: true }).click();
  await page.evaluate(() => {
    (
      window as unknown as { __speech: { current: { onerror: () => void } } }
    ).__speech.current.onerror();
  });
  await expect(page.getByRole("status")).toContainText("could not read");
  await expect(first).not.toHaveClass(/is-speaking/);
  const details = page.locator(".explanation").first();
  await details.locator("summary").click();
  await details
    .getByRole("button", { name: "Listen", exact: true })
    .first()
    .click();
  await details.locator("summary").click();
  await expect(page.locator(".is-speaking")).toHaveCount(0);
});

test("unavailable speech and blocked storage leave reading and translation usable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "speechSynthesis", {
      value: undefined,
      configurable: true,
    });
    delete (window as unknown as Record<string, unknown>)
      .SpeechSynthesisUtterance;
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage blocked");
      },
    });
  });
  await page.goto("/");
  await expect(
    page.getByText("Read Aloud is unavailable", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Listen", exact: true }).first(),
  ).toBeDisabled();
  await preferences(page);
  await page.getByLabel("Text size", { exact: true }).selectOption("large");
  await expect(page.locator(".paragraph-original").first()).toHaveCSS(
    "font-size",
    "19px",
  );
  const first = page.locator('[data-paragraph-id="p3"]');
  await first.getByRole("button", { name: "Translate" }).click();
  await expect(first.locator('[lang="es"]')).toContainText("vinagre");
});
