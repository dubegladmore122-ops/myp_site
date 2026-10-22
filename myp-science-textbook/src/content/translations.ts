// Demonstration translations for this chapter only; teacher review is required.
export const languages = { es: "Español", ja: "日本語" } as const;
export type Language = keyof typeof languages;
export const translations = {
  p0: {
    es: "Nuevas sustancias. Los mismos átomos (atoms). Descubre qué permanece igual cuando una reacción química cambia todo lo demás.",
    ja: "新しい物質になっても、原子（atoms）は同じです。化学反応でさまざまなことが変化するとき、何が変わらないのかを学びましょう。",
  },
  p3: {
    es: "Imagina que mezclas vinagre y bicarbonato de sodio. Aparecen burbujas, la mezcla burbujea y se forma un gas. Puede parecer que parte del material ha desaparecido. ¿Es así?",
    ja: "酢と重曹を混ぜるところを想像してください。泡が出て、気体が発生します。物質の一部が消えたように見えるかもしれません。本当に消えたのでしょうか。",
  },
  p4: {
    es: "Durante una reacción química, los átomos (atoms) se reorganizan para formar nuevas sustancias. Las sustancias iniciales se llaman reactivos (reactants). Las sustancias que se forman se llaman productos (products). Los átomos siguen ahí, pero unidos de formas diferentes.",
    ja: "化学反応では、原子（atoms）の組み合わせが変わり、新しい物質ができます。反応前の物質を反応物（reactants）、できた物質を生成物（products）と呼びます。原子はなくならず、結びつき方が変わるのです。",
  },
  p5: {
    es: "En un sistema cerrado (closed system), la masa total de los reactivos (reactants) es igual a la masa total de los productos (products).",
    ja: "閉鎖系（closed system）では、反応物（reactants）の質量の合計は、生成物（products）の質量の合計と等しくなります。",
  },
  p6: {
    es: "La masa (mass) describe la cantidad de materia de un objeto y se mide en gramos o kilogramos. El peso (weight) es la fuerza gravitatoria que actúa sobre un objeto y se mide en newtons.",
    ja: "質量（mass）は物体に含まれる物質の量を表し、グラムやキログラムで測ります。重さ（weight）は物体に働く重力の大きさで、ニュートンで測ります。",
  },
  p7: {
    es: "Un objeto tiene la misma masa (mass) en la Tierra y en la Luna, pero su peso (weight) es menor en la Luna porque allí la gravedad es más débil.",
    ja: "物体の質量（mass）は地球でも月でも同じですが、月では重力が弱いため、重さ（weight）は小さくなります。",
  },
  p8: {
    es: "Cuando el hidrógeno reacciona con el oxígeno para formar agua, los átomos (atoms) cambian de compañeros. En esta reacción química no se crean ni se destruyen átomos. El número de átomos de cada elemento es el mismo antes y después.",
    ja: "水素と酸素が反応して水になるとき、原子（atoms）の結びつく相手が変わります。この化学反応では、原子が新しく生まれたり消えたりすることはありません。各元素の原子の数は反応前後で同じです。",
  },
  p9: {
    es: "Un sistema cerrado (closed system) no permite que la materia entre ni salga. En un recipiente abierto, un gas puede escapar al entorno. La masa medida en el recipiente puede disminuir, aunque la masa total del recipiente y su entorno se conserva.",
    ja: "閉鎖系（closed system）では物質が出入りしません。開いた容器では、気体が周囲に逃げることがあります。容器で測った質量は減ることがありますが、容器と周囲を合わせた全体の質量は保存されます。",
  },
  p10: {
    es: "Cuando el vinagre reacciona con el bicarbonato de sodio, se forma dióxido de carbono (carbon dioxide). En un recipiente abierto, parte de este gas sale y se mezcla con el aire. La balanza situada debajo del recipiente ya no mide ese gas que escapó.",
    ja: "酢と重曹が反応すると、二酸化炭素（carbon dioxide）が発生します。開いた容器では、気体の一部が容器から出て空気と混ざります。容器の下のはかりは、逃げた気体を測ることができません。",
  },
  p11: {
    es: "Si incluyes el gas que escapó en las mediciones, la masa total antes y después es la misma. Un sistema cerrado (closed system) mantiene toda la materia dentro del límite de lo que se mide.",
    ja: "逃げた気体も含めて測れば、反応前後の質量の合計は同じです。閉鎖系（closed system）では、測定する範囲の内側にすべての物質がとどまります。",
  },
  p12: {
    es: "Seguridad: nunca selles una reacción que produce gas en un recipiente rígido; la presión puede aumentar. Toda investigación práctica necesita supervisión del docente y equipo adecuado.",
    ja: "安全上の注意：気体が発生する反応を、硬い容器に密閉してはいけません。圧力が高まる危険があります。実験には必ず先生の監督と適切な器具が必要です。",
  },
  p13: {
    es: "Si una reacción produce un gas, ¿cómo podrías recogerlo para que siga formando parte del sistema que pesas?",
    ja: "反応で気体が発生するとき、測定する系の一部として気体をとどめるには、どのように集めればよいでしょうか。",
  },
  p14: {
    es: "Una ecuación química ajustada (balanced chemical equation) muestra la conservación de los átomos (atoms). Para la formación de agua podemos escribir:",
    ja: "係数を合わせた化学反応式（balanced chemical equation）は、原子（atoms）の数が保存されることを示します。水ができる反応は、次のように書けます。",
  },
  p15: {
    es: "El número grande delante de una fórmula es un coeficiente (coefficient): indica cuántas moléculas se representan. En 2H₂O, las dos moléculas de agua contienen en total cuatro átomos de hidrógeno y dos de oxígeno.",
    ja: "化学式の前の大きな数字は係数（coefficient）で、分子の数を表します。2H₂Oでは、2個の水分子に水素原子が合計4個、酸素原子が合計2個含まれています。",
  },
  p16: {
    es: "El número pequeño dentro de una fórmula es un subíndice (subscript). Cambiar H₂O por H₂O₂ representaría una sustancia distinta: el peróxido de hidrógeno. Para ajustar una ecuación, cambia los coeficientes (coefficients) y mantén las fórmulas correctas.",
    ja: "化学式の中の小さな数字は下付き数字（subscript）です。H₂OをH₂O₂に変えると、過酸化水素という別の物質を表すことになります。反応式を合わせるときは、正しい化学式を保ち、係数（coefficients）を変えます。",
  },
  p17: {
    es: "En un sistema cerrado (closed system), 12 g de carbono reaccionan completamente con 32 g de oxígeno. ¿Qué masa de dióxido de carbono (carbon dioxide) se forma?",
    ja: "閉鎖系（closed system）で、12 gの炭素が32 gの酸素と完全に反応します。何gの二酸化炭素（carbon dioxide）ができるでしょうか。",
  },
  p18: {
    es: "La masa total permanece igual: 44 g de reactivos (reactants) producen 44 g de producto (product).",
    ja: "全体の質量は変わりません。44 gの反応物（reactants）から、44 gの生成物（product）ができます。",
  },
} as const satisfies Record<string, Record<Language, string>>;
export type ParagraphId = keyof typeof translations;
