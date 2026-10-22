export const vocabulary = {
  atoms: {
    title: "Atoms",
    definition:
      "The smallest units of an element that retain its chemical identity. In ordinary chemical reactions, atoms rearrange into new combinations.",
    example:
      "Each water molecule contains two hydrogen atoms and one oxygen atom.",
  },
  reactants: {
    title: "Reactants",
    definition:
      "The starting substances that take part in a chemical reaction.",
    example:
      "In the reaction that forms water, hydrogen and oxygen are the reactants.",
  },
  products: {
    title: "Products",
    definition: "The new substances formed in a chemical reaction.",
    example: "Water is the product when hydrogen reacts with oxygen.",
  },
  closedSystem: {
    title: "Closed system",
    definition:
      "A system in which matter cannot enter or leave. Energy can still pass between the system and its surroundings.",
    example:
      "A sealed container that retains all the gas produced by a reaction can act as a closed system.",
  },
  conservationOfMass: {
    title: "Conservation of mass",
    definition:
      "The principle that total mass stays the same during a chemical reaction when all matter is accounted for.",
    example:
      "In a closed system, 12 g of carbon reacting completely with 32 g of oxygen produces 44 g of carbon dioxide.",
  },
  balancedEquation: {
    title: "Balanced chemical equation",
    definition:
      "A chemical equation with the same number of atoms of each element on both sides.",
    example:
      "2H₂ + O₂ → 2H₂O has four hydrogen atoms and two oxygen atoms on each side.",
  },
} as const;
export type VocabularyTerm = keyof typeof vocabulary;
