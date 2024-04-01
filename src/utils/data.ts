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

const paper = {
  manifest: {
    title: "論文レビュー",
    functions: [
      {
        name: "paper_summary",
        description: "与えられた論文の要点をまとめ、以下の項目で日本語で出力せよ。それぞれの項目は最大でも180文字以内に要約せよ。",
        parameters: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "論文名:タイトルの日本語訳",
            },
            keywords: {
              type: "string",
              description: "キーワード:この論文のキーワード",
            },
            issues: {
              type: "string",
              description: "課題:この論文が解決する課題",
            },
            methods: {
              type: "string",
              description: "手法:この論文が提案する手法",
            },
            results: {
              type: "string",
              description: "結果:提案手法によって得られた結果",
            },
          },
          required: ["title", "keywords", "issues", "methods", "results"],
        },
      },
    ],
    description: "summarize paper agent. Original agent is https://github.com/rkmt/summarize_arxv",
    prompt: [
      "与えられた論文の要点をまとめ、以下の項目で日本語で出力せよ。それぞれの項目は最大でも180文字以内に要約せよ。",
      "```",
      "論文名:タイトルの日本語訳",
      "キーワード:この論文のキーワード",
      "課題:この論文が解決する課題",
      "手法:この論文が提案する手法",
      "結果:提案手法によって得られた結果",
      "```",
    ],
    sample: [
      "title: Attention Is All You Need",
      "body: The dominant sequence transduction models are based on complex recurrent or convolutional neural networks in an encoder-decoder configuration. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles by over 2 BLEU. On the WMT 2014 English-to-French translation task, our model establishes a new single-model state-of-the-art BLEU score of 41.8 after training for 3.5 days on eight GPUs, a small fraction of the training costs of the best models from the literature. We show that the Transformer generalizes well to other tasks by applying it successfully to English constituency parsing both with large and limited training data.",
    ].join("\n"),
    skip_function_result: true,
    actions: {
      paper_summary: {
        type: "message_template",
        message: "title: {title}\nkeywords: {keywords}\nissues: {issues}\nmethods: {methods}\nresults: {results}",
      },
    },
  },
};
console.log(paper);
export const dataSet = {
  game,
  paper,
};
