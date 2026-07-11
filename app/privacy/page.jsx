import Link from "next/link";
import "@/styles/privacy.css";

export const metadata = {
  title: "Privacy Policy | Joshspot Stories",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <article className="privacy-doc">
        <Link href="/whatsapp" className="privacy-back">
          Back
        </Link>
        <h1>Privacy Policy</h1>
        <p>
          Joshspot Stories respects your privacy. This page explains the basic ways
          information may be collected, used, and protected when you visit our website.
        </p>
        <h2>Information we collect</h2>
        <p>
          We may collect information you submit through forms, messages, comments, or
          other site features. We may also receive standard browser information such as
          device type, pages visited, approximate location, and analytics events.
        </p>
        <h2>How we use information</h2>
        <p>
          Information may be used to operate the website, improve content, prevent abuse,
          respond to messages, measure performance, and show relevant advertising.
        </p>
        <h2>Advertising and tracking</h2>
        <p>
          We may use third-party tools such as analytics pixels and advertising networks.
          These services may use cookies or similar technologies according to their own
          policies.
        </p>
        <h2>Your choices</h2>
        <p>
          You can manage cookies in your browser settings. You may also avoid submitting
          personal information through public forms if you do not want it processed.
        </p>
        <h2>Contact</h2>
        <p>
          For privacy questions, contact the site owner through the available contact
          channels on Joshspot Stories.
        </p>
      </article>
    </main>
  );
}
