// eslint.config.js

import next from "eslint-plugin-next";

export default [
  {
    plugins: {
      next,
    },
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
];
