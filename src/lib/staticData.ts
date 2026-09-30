export const DRIVER_DATA: Record<string, { blurb: string, fines: { amount: string, reason: string }[], dnfCount: number, dqCount: number }> = {
  "max_verstappen": {
    blurb: "Born into a racing family, Max Verstappen became the youngest driver to compete in Formula 1 at age 17. Known for his aggressive driving style and raw pace, he quickly established himself as a generational talent.",
    fines: [
      { amount: "€50,000", reason: "Touching Lewis Hamilton's rear wing in parc fermé at the 2021 Brazilian GP." }
    ],
    dnfCount: 31,
    dqCount: 0
  },
  "norris": {
    blurb: "Lando Norris entered F1 with McLaren in 2019 after a stellar junior career. He is widely praised for his consistency, qualifying pace, and charismatic personality that has brought a new generation of fans to the sport.",
    fines: [],
    dnfCount: 9,
    dqCount: 0
  },
  "leclerc": {
    blurb: "Charles Leclerc joined Ferrari in 2019 and immediately proved his worth by winning in Spa and Monza. He is considered one of the fastest qualifiers in F1 history.",
    fines: [
      { amount: "€10,000", reason: "Using foul language during the post-race press conference in Mexico 2024." }
    ],
    dnfCount: 18,
    dqCount: 1
  },
  "hamilton": {
    blurb: "Sir Lewis Hamilton is statistically the most successful driver in Formula 1 history, holding the record for the most wins, pole positions, and podium finishes, alongside 7 World Championships.",
    fines: [
      { amount: "€25,000", reason: "Crossing the live track after crashing at the 2023 Qatar Grand Prix." },
      { amount: "€50,000", reason: "Failing to attend the FIA Prize Giving Gala in 2021." }
    ],
    dnfCount: 29,
    dqCount: 1
  },
  "alonso": {
    blurb: "Fernando Alonso is a two-time World Champion known for his relentless race craft and ability to out-perform his machinery. He debuted in 2001 and remains highly competitive.",
    fines: [
      { amount: "€100,000 (Team)", reason: "Involved in the 'Crashgate' controversy at the 2008 Singapore GP." }
    ],
    dnfCount: 74,
    dqCount: 0
  }
};

export const TEAM_DATA: Record<string, { blurb: string, history: string, isRetired: boolean }> = {
  "red_bull": {
    blurb: "Red Bull Racing entered F1 in 2005 after purchasing Jaguar. They quickly became a dominant force, winning multiple championships with Sebastian Vettel and Max Verstappen.",
    history: "Known for their aggressive aerodynamic designs led by Adrian Newey.",
    isRetired: false
  },
  "mclaren": {
    blurb: "Founded by Bruce McLaren in 1963, McLaren is the second oldest active and second most successful Formula One team, having won 8 Constructors' Championships.",
    history: "Legendary rivalries include Senna vs Prost in the late 80s.",
    isRetired: false
  },
  "ferrari": {
    blurb: "Scuderia Ferrari is the oldest and most successful Formula One team, having competed in every world championship since the 1950 season.",
    history: "The pride of Italy, defined by passion and the iconic prancing horse.",
    isRetired: false
  },
  "sauber": {
    blurb: "Sauber Motorsport is a Swiss motorsport engineering company founded in 1970. They debuted in F1 in 1993 and have been a respected independent constructor.",
    history: "Operated under various names including BMW Sauber and Alfa Romeo.",
    isRetired: true
  }
};
