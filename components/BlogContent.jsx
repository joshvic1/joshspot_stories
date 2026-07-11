import BlogAd from "./BlogAd";

function seededNumber(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function splitHtmlBlocks(html) {
  const content = String(html || "");
  const splitContent = content
    .replace(/(<\/(?:p|div|h2|h3|ul|ol|blockquote|figure)>)/gi, "$1<!--blog-split-->")
    .replace(/(<img[^>]*>)/gi, "$1<!--blog-split-->");
  const blocks = splitContent
    .split("<!--blog-split-->")
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.length > 0 ? blocks : [content];
}

export default function BlogContent({ html, seed }) {
  const blocks = splitHtmlBlocks(html);
  const start = (seededNumber(seed) % 2) + 2;
  const interval = 3;
  const maxInlineAds = Math.min(3, Math.max(1, Math.floor(blocks.length / 4)));
  let adCount = 0;

  return (
    <div className="blog-content">
      {blocks.map((block, index) => {
        const shouldShowAd =
          index >= start &&
          (index - start) % interval === 0 &&
          adCount < maxInlineAds &&
          index < blocks.length - 1;
        const adIndex = adCount + 1;
        if (shouldShowAd) adCount += 1;

        return (
          <div key={`${seed}-${index}`}>
            <div dangerouslySetInnerHTML={{ __html: block }} />
            {shouldShowAd && <BlogAd index={adIndex} />}
          </div>
        );
      })}
    </div>
  );
}
