import BlogAd from "./BlogAd";
import RelatedBlogPosts from "./RelatedBlogPosts";

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

export default function BlogContent({ html, seed, inlineRelatedPosts = [] }) {
  const blocks = splitHtmlBlocks(html);
  const secondAdIndex = Math.min(1, blocks.length - 1);
  const remainingAdCount = Math.min(4, Math.max(1, Math.floor(blocks.length / 5)));
  const remainingStart = Math.min(4, blocks.length - 1);
  const interval = Math.max(
    3,
    Math.ceil(Math.max(1, blocks.length - remainingStart) / remainingAdCount)
  );
  const relatedIndex =
    inlineRelatedPosts.length > 0 && blocks.length > 4
      ? Math.min(
          blocks.length - 2,
          Math.max(3, (seededNumber(`${seed}-related`) % (blocks.length - 3)) + 2)
        )
      : -1;
  let adCount = 1;
  let remainingAdsShown = 0;

  return (
    <div className="blog-content">
      {blocks.map((block, index) => {
        const shouldShowSecondAd = index === secondAdIndex;
        const shouldShowRemainingAd =
          !shouldShowSecondAd &&
          index >= remainingStart &&
          (index - remainingStart) % interval === 0 &&
          remainingAdsShown < remainingAdCount &&
          index < blocks.length - 1;
        const shouldShowAd = shouldShowSecondAd || shouldShowRemainingAd;
        const adIndex = adCount + 1;
        if (shouldShowAd) {
          adCount += 1;
          if (shouldShowRemainingAd) remainingAdsShown += 1;
        }

        return (
          <div key={`${seed}-${index}`}>
            <div dangerouslySetInnerHTML={{ __html: block }} />
            {shouldShowAd && <BlogAd index={adIndex} />}
            {index === relatedIndex && (
              <RelatedBlogPosts posts={inlineRelatedPosts.slice(0, 5)} variant="inline" />
            )}
          </div>
        );
      })}
    </div>
  );
}
