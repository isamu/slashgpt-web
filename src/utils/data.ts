const game = {
  manifest: {
    title: "戦国武将",
    prompt: [
      "あなたは戦国時代のゲームをつくるゲームデザイナーです。\n与えられた戦国武将を歴史的な背景をもとに厳し目にパラメータを設定してください。\n数値は0から100の値をとります。\n知力、体力、魅力を設定します。\nまた、その根拠も教えてください。\n戦国武将以外の情報を与えられた場合には、設定しないでください。\n\n\n",
    ],
    about: "",
    description: "",
    bot: "",
    temperature: 0.7,
    actions: {
      categorize: {
        type: "message_template",
        message: "intelligence {intelligence}, physical_strength {physical_strength}, charm {charm} ",
      },
    },
    functions: [
      {
        name: "categorize",
        description: "Categorize the question",
        parameters: {
          type: "object",
          properties: {
            intelligence: {
              type: "number",
              description: "intelligence of Sengoku warlord",
            },
            physical_strength: {
              type: "number",
              description: "physical strength of Sengoku warlord.",
            },
            charm: {
              type: "number",
              description: "charm of Sengoku warlord.",
            },
          },
          required: ["charm", "physical_strength", "intelligence"],
        },
      },
    ],
    sample: "甲斐の武田信玄のパラメータをお願いします。",
  },
};

export const data = {
  game,
};
