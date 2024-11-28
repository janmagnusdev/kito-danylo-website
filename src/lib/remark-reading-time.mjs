import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";
import { t } from "i18next";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    const minutes = Math.ceil(readingTime.minutes).toFixed(0);
    const readingTimeText = t("blog.readingTime", { minutes });
    data.astro.frontmatter.minutesRead = readingTimeText;
  };
}
