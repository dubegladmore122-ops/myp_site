import Vocabulary from "@/components/Vocabulary";

const sections = [
  "The big idea",
  "A closer look",
  "Counting atoms",
  "Chapter summary",
];
function Diagram() {
  return (
    <svg
      viewBox="0 0 700 230"
      role="img"
      aria-labelledby="diagram-title diagram-desc"
    >
      <title id="diagram-title">Atoms rearrange to form water</title>
      <desc id="diagram-desc">
        Two hydrogen molecules and one oxygen molecule form two water molecules.
        Four hydrogen atoms and two oxygen atoms are present on both sides.
      </desc>
      <defs>
        <pattern id="dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#dce4d8" />
        </pattern>
      </defs>
      <rect width="700" height="230" rx="12" fill="url(#dots)" />
      <g stroke="#9caf9d" strokeWidth="7">
        <path d="M75 76h40M75 142h40M195 110h43M466 115l-30-30m30 30 30-30M591 115l-30-30m30 30 30-30" />
      </g>
      <g fill="#edf2e0" stroke="#769c7e" strokeWidth="2">
        {[
          [75, 76],
          [115, 76],
          [75, 142],
          [115, 142],
          [436, 85],
          [496, 85],
          [561, 85],
          [621, 85],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="16" />
        ))}
      </g>
      <g fill="#d98d66" stroke="#b46f4a" strokeWidth="2">
        {[
          [195, 110],
          [238, 110],
          [466, 115],
          [591, 115],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="22" />
        ))}
      </g>
      <path
        d="M306 110h70m-12-9 12 9-12 9"
        fill="none"
        stroke="#547d5b"
        strokeWidth="2"
      />
      <g fontFamily="Arial" fontSize="13" textAnchor="middle" fill="#506950">
        <text x="95" y="195">
          2 hydrogen molecules
        </text>
        <text x="217" y="48">
          1 oxygen molecule
        </text>
        <text x="530" y="195">
          2 water molecules
        </text>
      </g>
    </svg>
  );
}
export default function Home() {
  return (
    <div className="shell">
      <a className="skip" href="#main">
        Skip to chapter
      </a>
      <aside className="sidebar" aria-label="Textbook navigation">
        <a href="#top" className="brand">
          <b className="mark">m.</b>
          <span>
            mosaic<small>SCIENCE, CONNECTED</small>
          </span>
        </a>
        <div className="course">
          <span className="eyebrow">YOUR TEXTBOOK</span>
          <strong>MYP Science</strong>
          <span>Year 3 · Student edition</span>
        </div>
        <div className="nav-label">
          COURSE CONTENTS <span>03 UNITS</span>
        </div>
        <div className="unit muted">
          01 <span>Matter & its properties</span>
        </div>
        <div className="unit muted">
          02 <span>Forces & energy</span>
        </div>
        <div className="unit">
          03 <strong>Chemical reactions</strong>
          <span>⌄</span>
        </div>
        <nav aria-label="Unit chapters">
          <a href="#top" className="active" aria-current="page">
            <span>3.1</span> Conservation of mass
          </a>
          <div className="subnav">
            {sections.map((s, i) => (
              <a href={`#section-${i + 1}`} key={s}>
                {s}
              </a>
            ))}
          </div>
        </nav>
        <p className="coming">
          More chapters will be added
          <br />
          as this textbook grows.
        </p>
        <div className="sidebar-bottom">
          <span>✳</span>
          <p>
            A little curiosity.
            <br />
            <strong>A world of discovery.</strong>
          </p>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <span>
            MYP Science <i>/</i> Chemical reactions
          </span>
          <span className="edition">
            STUDENT TEXTBOOK <b>●</b>
          </span>
        </header>
        <main id="main">
          <div id="top" className="breadcrumb">
            UNIT 03 <span>/</span> CHEMICAL REACTIONS <span>/</span> CHAPTER 3.1
          </div>
          <div className="columns">
            <article>
              <div className="meta">
                <span className="tag">CHEMISTRY</span>
                <span>◷ &nbsp; 8 min read</span>
              </div>
              <h1>
                Conservation
                <br />
                of mass<span>.</span>
              </h1>
              <p className="intro">
                New substances. Same atoms. Discover what stays the same when a
                chemical reaction changes everything else.
              </p>
              <div className="demo">
                <span aria-hidden="true">ⓘ</span>
                <p>
                  <strong>A preview of your textbook</strong> · Demonstration
                  content for design review. This chapter is not based on
                  uploaded teaching materials.
                </p>
              </div>
              <section className="objectives" aria-labelledby="learning">
                <span className="target" aria-hidden="true">
                  ◎
                </span>
                <div>
                  <span className="eyebrow">YOUR LEARNING JOURNEY</span>
                  <h2 id="learning">By the end of this chapter, you can…</h2>
                  <ul>
                    <li>Explain the law of conservation of mass.</li>
                    <li>
                      Describe how atoms rearrange in a chemical reaction.
                    </li>
                    <li>Use mass measurements to predict a missing mass.</li>
                  </ul>
                </div>
              </section>
              <p className="interaction-guide">
                Select an underlined science term for a definition. Open
                “Explore further” boxes when you want a little more detail.
              </p>
              <section id="section-1" className="reading">
                <div className="section-label">
                  01 <span>THE BIG IDEA</span>
                </div>
                <h2>Where does the mass go?</h2>
                <p>
                  Imagine mixing vinegar and baking soda. Bubbles appear, the
                  mixture fizzes, and a gas forms. It might look as though some
                  of the material has disappeared. Has it?
                </p>
                <p>
                  During a chemical reaction,{" "}
                  <Vocabulary term="atoms">atoms</Vocabulary> are rearranged to
                  form new substances. The substances we start with are called{" "}
                  <Vocabulary term="reactants">reactants</Vocabulary>. The
                  substances formed are called{" "}
                  <Vocabulary term="products">products</Vocabulary>. The atoms
                  are still there—just joined together in different ways.
                </p>
                <div className="key">
                  <span className="eyebrow">
                    THE LAW OF CONSERVATION OF MASS
                  </span>
                  <p>
                    In a{" "}
                    <Vocabulary term="closedSystem">closed system</Vocabulary>,
                    the total mass of the reactants equals the total mass of the
                    products.
                  </p>
                  <div className="mass">
                    mass of reactants <span>=</span> mass of products
                  </div>
                </div>
                <details className="explanation">
                  <summary>
                    <span className="eyebrow">EXPLORE FURTHER</span>Is mass the
                    same as weight?
                  </summary>
                  <div>
                    <p>
                      Mass describes how much matter an object contains and is
                      measured in grams or kilograms. Weight is the
                      gravitational force on an object and is measured in
                      newtons.
                    </p>
                    <p>
                      An object has the same mass on Earth and on the Moon, but
                      its weight is smaller on the Moon because gravity is
                      weaker there.
                    </p>
                  </div>
                </details>
              </section>
              <section id="section-2" className="reading">
                <div className="section-label">
                  02 <span>A CLOSER LOOK</span>
                </div>
                <h2>Same atoms. New arrangements.</h2>
                <p>
                  When hydrogen reacts with oxygen to form water, the atoms
                  change partners. No atoms are created or destroyed in this
                  chemical reaction. Each kind of atom has the same count before
                  and after.
                </p>
                <figure>
                  <div className="figure-top">
                    <span>PARTICLE MODEL</span>
                    <span>ILLUSTRATIVE DIAGRAM</span>
                  </div>
                  <Diagram />
                  <figcaption>
                    <strong>Figure 1.</strong> A simplified demonstration
                    diagram. Small pale circles represent hydrogen atoms; larger
                    orange circles represent oxygen atoms. Particles are not
                    drawn to scale.
                  </figcaption>
                </figure>
                <h3>Why does a closed system matter?</h3>
                <p>
                  A closed system allows no matter to enter or leave. In an open
                  container, a gas can escape into the surroundings. The mass
                  measured in the container may decrease, even though the total
                  mass of the container and its surroundings is conserved.
                </p>
                <details className="explanation">
                  <summary>
                    <span className="eyebrow">EXPLORE FURTHER</span>Why can an
                    open container seem to lose mass?
                  </summary>
                  <div>
                    <p>
                      When vinegar reacts with baking soda, carbon dioxide gas
                      forms. In an open container, some of this gas leaves the
                      container and mixes with the air. A balance beneath the
                      container no longer measures that escaped gas.
                    </p>
                    <p>
                      If you include the escaped gas in your measurements, the
                      total mass before and after is the same. A closed system
                      keeps all the matter within the boundary being measured.
                    </p>
                    <p className="safety-note">
                      Safety: never seal a gas-producing reaction in a rigid
                      container; pressure can build up. Any practical
                      investigation needs teacher supervision and suitable
                      equipment.
                    </p>
                  </div>
                </details>
                <aside className="think">
                  <span aria-hidden="true">?</span>
                  <div>
                    <h3>Pause & think</h3>
                    <p>
                      If a reaction produces a gas, how could you collect it so
                      that it stays part of the system you weigh?
                    </p>
                  </div>
                </aside>
              </section>
              <section id="section-3" className="reading">
                <div className="section-label">
                  03 <span>COUNTING ATOMS</span>
                </div>
                <h2>Make the numbers add up.</h2>
                <p>
                  A{" "}
                  <Vocabulary term="balancedEquation">
                    balanced chemical equation
                  </Vocabulary>{" "}
                  shows conservation of atoms. For the formation of water, we
                  can write:
                </p>
                <div className="equation">
                  2H₂ + O₂ <span>→</span> 2H₂O
                </div>
                <details className="explanation">
                  <summary>
                    <span className="eyebrow">EXPLORE FURTHER</span>Why change
                    the big numbers, not the small ones?
                  </summary>
                  <div>
                    <p>
                      The big number before a formula is a coefficient: it tells
                      us how many molecules are represented. In 2H₂O, two water
                      molecules contain four hydrogen atoms and two oxygen atoms
                      altogether.
                    </p>
                    <p>
                      The small number within a formula is a subscript. Changing
                      H₂O to H₂O₂ would describe a different substance, hydrogen
                      peroxide. To balance an equation, change coefficients
                      while keeping the correct formulas.
                    </p>
                  </div>
                </details>
                <div className="table-wrap">
                  <table>
                    <caption>
                      Number of atoms on each side of the equation
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Element</th>
                        <th scope="col">Reactants</th>
                        <th scope="col">Products</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Hydrogen (H)</th>
                        <td>4 atoms</td>
                        <td>4 atoms</td>
                      </tr>
                      <tr>
                        <th scope="row">Oxygen (O)</th>
                        <td>2 atoms</td>
                        <td>2 atoms</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="example">
                  <span className="eyebrow">WORKED EXAMPLE</span>
                  <h3>Finding a missing mass</h3>
                  <p>
                    In a closed system, 12 g of carbon reacts completely with 32
                    g of oxygen. What mass of carbon dioxide forms?
                  </p>
                  <div className="calculation">
                    12 g + 32 g = <strong>44 g</strong>
                  </div>
                  <p className="note">
                    The total mass stays the same: 44 g of reactants produces 44
                    g of product.
                  </p>
                </div>
              </section>
              <section id="section-4" className="reading summary">
                <div className="section-label">
                  04 <span>CHAPTER SUMMARY</span>
                </div>
                <h2>Take these ideas with you.</h2>
                <ul>
                  <li>
                    Atoms rearrange during chemical reactions; they are not
                    created or destroyed.
                  </li>
                  <li>
                    <Vocabulary term="conservationOfMass">
                      Conservation of mass
                    </Vocabulary>{" "}
                    means that in a closed system, reactant mass equals product
                    mass.
                  </li>
                  <li>
                    An apparent change in mass may mean matter entered or left
                    the system.
                  </li>
                </ul>
              </section>
              <footer className="chapter-footer">
                <div>
                  <span className="eyebrow">YOU’VE REACHED THE END</span>
                  <p>Keep asking what changes—and what stays the same.</p>
                </div>
                <a href="#top">Back to top ↑</a>
              </footer>
            </article>
            <aside className="page-index" aria-label="On this page">
              <span className="eyebrow">IN THIS CHAPTER</span>
              <nav>
                {sections.map((s, i) => (
                  <a href={`#section-${i + 1}`} key={s}>
                    <span>0{i + 1}</span>
                    {s}
                  </a>
                ))}
              </nav>
              <div className="question">
                <span className="eyebrow">THE BIG QUESTION</span>
                <p>
                  Can matter really
                  <br />
                  disappear?
                </p>
                <div aria-hidden="true">
                  ○ — ○<br />
                  ↓<br />
                  ○○
                </div>
              </div>
            </aside>
          </div>
        </main>
        <footer className="site-footer">
          <span>mosaic / MYP Science</span>
          <span>Demonstration prototype · Chapter 3.1</span>
        </footer>
      </div>
    </div>
  );
}
