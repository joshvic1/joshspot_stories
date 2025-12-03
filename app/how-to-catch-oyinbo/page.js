/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-irregular-whitespace */

"use client";

import { useEffect, useRef } from "react";
import MainLayout from "@/components/Layout/MainLayout";

// React page: how-to-catch-oyinbo.js
// Notes:
// - Loads AdSense script ONCE on mount
// - Renders multiple ad units and "pushes" them after render
// - Pure React (works in CRA/Vite/Next). In Next.js App Router, place in /app/how-to-catch-oyinbo/page.jsx and export default component.

function AdUnit({ className = "my-8" }) {
  const ref = useRef(null);

  useEffect(() => {
    // Ensure AdSense script exists
    const SCRIPT_SRC =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1759270581850188";
    const existing = document.querySelector(`script[src=\"${SCRIPT_SRC}\"]`);
    if (!existing) {
      const s = document.createElement("script");
      s.async = true;
      s.src = SCRIPT_SRC;
      s.crossOrigin = "anonymous";
      document.head.appendChild(s);
    }

    // Try to push this ad unit
    const pushAd = () => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // ignore
      }
    };

    // Push when script is ready
    const timer = setTimeout(pushAd, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ins
      ref={ref}
      className={`adsbygoogle block ${className}`}
      style={{ display: "block" }}
      data-ad-client="ca-pub-1759270581850188"
      data-ad-slot="6027685473"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

export default function HowToCatchOyinboPage() {
  return (
    <MainLayout>
      <main className="px-5 sm:px-6 md:px-8 lg:px-10 py-10 max-w-3xl mx-auto leading-8 text-[17px] text-slate-800">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            So You Want an Oyinbo Lover? Here’s the Ultimate Nigerian Guide!
          </h1>
          <p className="text-slate-600">
            A classy, lightly humorous, and deeply practical guide for Nigerians
            (men and women) who want to build real cross‑cultural
            relationships—without losing their sauce.
          </p>
        </header>

        {/* Ad 1 */}
        <AdUnit />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            First Things First: Know Your “Why”
          </h2>
          <p>
            Let’s start with honesty. Why do you want an Oyinbo partner?
            Curiosity? Attraction? Cultural mix? Openness? Or you think they’ll
            automatically treat you better than Nigerians (spoiler: character no
            dey wear nationality). Your “why” shapes your energy. If it’s
            superficial—passport, accent, or fantasy—it will show. If it’s
            meaningful—shared values, respect, curiosity—your confidence will
            glow naturally.
          </p>
          <p>
            A healthy why sounds like this:{" "}
            <strong>
              “I want a partner who respects me, shares my values, appreciates
              my Nigerian identity, and is open to learning across cultures.”
            </strong>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Mindset Over Performance</h2>
          <p>
            You’re not auditioning for “Global Bae of the Year.” You’re building
            connection. Confidence is quiet stability: knowing who you are and
            what you bring. Your Nigerian identity—food, music, humour, faith,
            community—isn’t a quirk to hide. It’s an asset. Don’t water yourself
            down to be more “international.” Be more <em>intentional</em>.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Drop the need to impress.</strong> Focus on curiosity,
              kindness, and clarity. Humble + self‑assured beats loud packaging
              every time.
            </li>
            <li>
              <strong>Own your story.</strong> Lagos hustle or Enugu calm—speak
              your journey with dignity.
            </li>
            <li>
              <strong>Romance ≠ rescue.</strong> Healthy love is two standing
              people, not one standing and one leaning.
            </li>
          </ul>
        </section>

        {/* Ad 2 */}
        <AdUnit />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Stereotypes: Address, Don’t Absorb
          </h2>
          <p>
            You’ll hear assumptions: “Is your family strict?” “Do you eat spicy
            food daily?” “Is Nigeria safe?” Breathe. Don’t become a defensive
            lecturer. Share your reality with stories, not debates. Flip the
            energy: “That’s a common stereotype—happy to show you how my life is
            actually set up.”
          </p>
          <p>
            Challenge your own stereotypes too. Not all Oyinbo people are cold,
            rich, or anti‑family. Culture shapes tendencies, not destinies.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Core Values: The Real Love Currency
          </h2>
          <p>
            Strip accents, passports, and playlists, and values remain. If your
            values clash, chemistry only carries you for two weekends and one
            vacation. Prioritise honesty, commitment alignment, respect, clear
            communication, family/community expectations, and faith/worldview.
          </p>
          <p>
            When values align, culture becomes a playground. When they clash,
            culture becomes a battlefield. Choose alignment.
          </p>
        </section>

        {/* Ad 3 */}
        <AdUnit />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Where to Meet Quality Oyinbo Partners
          </h2>
          <h3 className="text-xl font-semibold">Online</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Dating apps (used properly):</strong> Hinge, Bumble,
              OkCupid. Bio = identity + interests + intention. Example:
              “Abuja‑born designer, book lover, slow‑travel fan. Faith‑minded.
              Looking for depth, laughter, and teamwork.”
            </li>
            <li>
              <strong>Interest communities:</strong> Language exchanges,
              photography groups, dev forums, travel meetups, book clubs. Shared
              interests slice through small talk.
            </li>
            <li>
              <strong>Social media (done smart):</strong> Follow creators you
              genuinely like; leave thoughtful comments. Your comments are
              mini‑billboards.
            </li>
          </ul>
          <h3 className="text-xl font-semibold">Offline</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Cultural events:</strong> Art shows, film festivals,
              international food fairs. Smile and ask questions. Curiosity is
              magnetic.
            </li>
            <li>
              <strong>Classes & clubs:</strong> Salsa, hiking, pottery, improv.
              Meeting via passions feels organic.
            </li>
            <li>
              <strong>Travel with intention:</strong> Multicultural cities
              (London, Lisbon, Toronto, NYC) or expat communities in
              Lagos/Abuja/Accra. Show up respectfully.
            </li>
          </ul>
        </section>

        {/* Ad 4 */}
        <AdUnit />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Your Profile & Photos: Global‑Ready, Still Nigerian
          </h2>
          <p>
            Keep your bio short, textured, and true—identity, interests,
            intention. Photos should tell a story: 1 clean headshot, 1
            full‑body, 2 lifestyle, 1 social. Smile like NEPA didn’t catch you
            today. Warmth converts.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Openers That Get Replies (For Both Genders)
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>“Your gallery photo—what was your favourite piece?”</li>
            <li>
              “You’ve been to Ghana—did you try waakye? I’m biased but jollof
              still holds.”
            </li>
            <li>
              “You like hiking? Drop your top 3 beginner‑friendly trails.”
            </li>
            <li>“You’re learning Yoruba—best word so far?”</li>
          </ul>
        </section>

        {/* Ad 5 */}
        <AdUnit />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Communication: Direct but Gentle
          </h2>
          <p>
            Many Western cultures value directness; Nigerians often speak with
            context and tone. Blend both: say the thing, but kindly. Instead of
            “You’re always late,” try “I value punctuality—can we pick times we
            can stick to?” Learn to receive directness too. If they say they’re
            not ready for a relationship, believe them.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Classy Flirting, Nigerian Edition
          </h2>
          <p>
            Flirting = warmth + curiosity + confidence. Compliment character and
            vibe: “I love how thoughtful your messages are,” “You have a
            peaceful energy.” In person, let your eyes and smile do quiet work.
            Touch only with consent and context.
          </p>
        </section>

        {/* Ad 6 */}
        <AdUnit />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            First Dates That Translate Across Cultures
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Gallery + gelato:</strong> Art reduces awkwardness; gelato
              softens the vibe.
            </li>
            <li>
              <strong>Daytime coffee + short walk:</strong> Safe, simple,
              talk‑friendly. Add a bookstore.
            </li>
            <li>
              <strong>Food market/fair:</strong> Share bites, swap stories,
              banter everywhere.
            </li>
            <li>
              <strong>Cook‑together (2nd/3rd date):</strong> Introduce plantain
              or jollof—keep it light.
            </li>
          </ul>
        </section>

        {/* Ad 7 */}
        <AdUnit />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Showcasing Culture Without Turning It Into a TED Talk
          </h2>
          <p>
            Invite them gently: share a song (Asa, Johnny Drille, The Cavemen),
            a movie (fun like “The Wedding Party” or thoughtful like
            “Citation”), and a story (grandma’s wisdom, your Sunday routine).
            Ask for theirs too. Mutual curiosity is romantic.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Faith, Family & Big Topics—When to Bring Them Up
          </h2>
          <p>
            By date two or three, cover the big rocks: faith stance,
            relationship goals, kids or no kids, openness to relocation, money
            styles. Keep it soft and curious: “Faith anchors me; Sundays matter—
            how does spirituality show up for you?”
          </p>
        </section>

        {/* Ad 8 */}
        <AdUnit />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Boundaries: The Silent Flex</h2>
          <p>
            Boundaries are attractive because they signal self‑respect. Be clear
            about what you won’t accept— disrespect, inconsistency, disappearing
            acts, or rushed intimacy you’re not comfortable with. If someone
            leaves because you set standards, let them. It’s misalignment
            leaving, not love.
          </p>
        </section>

        {/* Ad 9 */}
        <AdUnit />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Long‑Distance, Time Zones & Communication Rhythm
          </h2>
          <p>
            Cross‑border love needs rhythm. Agree on your primary channels
            (text/voice/video), preferred times, and response windows. Send
            “anchors” during the week: a morning check‑in, mid‑week voice note,
            and a weekend video date. Share small daily moments—photos of your
            food, a short clip from your day, one thing you’re grateful for.
            Consistency beats intensity.
          </p>
          <p>
            Plan reunions in advance if you’re in different countries. Alternate
            visits if possible. Keep receipts, respect visa laws, and don’t put
            anyone in a risky situation to prove love. Real love is patient and
            practical.
          </p>
        </section>

        {/* Ad 10 */}
        <AdUnit />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Money Talks & Lifestyle Expectations
          </h2>
          <p>
            Talk money early—but respectfully. Who pays for what on dates? How
            do you both view gifts, vacations, and savings? Don’t assume Oyinbo
            = ATM; also don’t assume Nigerian = provider by default. Define a
            balanced approach that honours values and realities. If distance is
            involved, discuss travel budgets transparently.
          </p>
          <p>
            If one partner earns in a stronger currency, address how that
            affects shared experiences without breeding entitlement or
            resentment. Be generous, be fair, and communicate.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Meeting Friends & Family—with Grace
          </h2>
          <p>
            Prep each other. Share cultural expectations beforehand: greetings,
            gifts, conversational norms. Teach your partner how to pronounce
            names and when to say “Good morning sir/ma.” In return, learn how
            their family does things—first‑name basis? shoes off indoors? Bring
            a small, thoughtful gift on first visits (coffee beans, tea, a local
            snack, or a mini photo book of places you love in Nigeria).
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Green Flags vs Red Flags in Cross‑Cultural Dating
          </h2>
          <h3 className="text-xl font-semibold">Green Flags</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Curiosity without fetishization.</li>
            <li>Consistency without pressure.</li>
            <li>Respect for boundaries and culture.</li>
            <li>Shared humour and ease during conflict repair.</li>
          </ul>
          <h3 className="text-xl font-semibold">Red Flags</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Passport talk and transactional energy.</li>
            <li>Disrespecting your faith/family or mocking your accent.</li>
            <li>
              Secretive behaviour, excuses, or love‑bombing followed by silence.
            </li>
            <li>
              Pressure to relocate/marry instantly without proper process.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Building Something That Lasts</h2>
          <p>
            Sustainable love is built from rituals (morning texts, Sunday
            calls), repair (apologise well, forgive wisely), and planning
            (shared goals, travel calendars, growth habits). Keep curiosity
            alive: learn each other’s foods, languages, and histories. Celebrate
            small wins, document memories, and anchor the relationship in
            service—how do we make each other’s lives easier?
          </p>
          <p>
            Above all, protect your dignity and your joy. You’re not trying to
            “catch” someone—you’re building a life with someone who’s also
            choosing you. That’s the ultimate flex.
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Common Challenges in Nigerian–Oyinbo Relationships (and How to
            Handle Them Like a Pro)
          </h2>
          <p>
            Cross-cultural relationships come with unique joys—but also unique
            challenges. Not because one side is “difficult,” but because two
            different worlds are learning to dance to the same rhythm. If you
            understand these challenges early, you’ll handle them with grace
            instead of confusion.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Communication differences:</strong> Nigerians may rely on
              tone and context; Oyinbo partners may rely on direct wording.
              Clarify meaning with kindness.
            </li>
            <li>
              <strong>Emotional expression:</strong> Some Western cultures share
              feelings openly; others keep it measured. Discuss love languages
              early.
            </li>
            <li>
              <strong>Expectations in dating timelines:</strong> Nigerians may
              see dating as intentional and short road to marriage. Some Oyinbo
              cultures date longer before commitment. Align expectations early.
            </li>
          </ul>
          <p>
            The solution:{" "}
            <strong>Talk often. Clarify early. Assume good intent.</strong> Ask
            rather than assume. Explain your perspective with stories, not
            accusations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Maintaining Your Nigerian Identity Without Losing Yourself
          </h2>
          <p>
            Loving someone from another culture shouldn’t require erasing yours.
            You don’t need to dilute your accent, avoid your food, or “tone
            down” your energy to be accepted. A partner who genuinely loves you
            will be curious about your world.
          </p>
          <p>Keep your identity alive intentionally:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Teach them a few phrases in your language (start with greetings
              and sweet compliments).
            </li>
            <li>
              Celebrate your holidays—Christmas, Eid, New Yam Festival, or
              Independence Day—with pride.
            </li>
            <li>
              Share playlists that reflect your vibe: Asa, Johnny Drille, Teni,
              Cavemen, Oxlade.
            </li>
            <li>
              Keep cultural rituals that matter to you: prayer routines, family
              check-ins, Sunday rice.
            </li>
          </ul>
          <p>
            Identity is attractive when it’s rooted, joyful, and secure. If you
            don’t honour your culture, your partner won’t know how to respect it
            either.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            How to Introduce Them to Nigerian Culture Without Overwhelming Them
          </h2>
          <p>
            You want to show them the beauty of Nigeria—but don’t drop them into
            a cultural “masterclass” on day one. Culture is best enjoyed like
            pepper: gradually increased until the flavour hits just right.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Start with fun:</strong> Music, food, and humour are safe
              entry points.
            </li>
            <li>
              <strong>Avoid intense debates early:</strong> Politics, tribe
              rivalry, and heavy religious arguments can wait.
            </li>
            <li>
              <strong>Use storytelling:</strong> Share family traditions and
              childhood memories instead of cultural lectures.
            </li>
            <li>
              <strong>Invite, don’t force:</strong> “Would you like to try
              suya?” works better than “If you don’t eat spicy food, we can’t
              date.”
            </li>
          </ul>
          <p>
            When they enjoy things at their pace, they become genuinely
            invested—not performing culture to impress you.
          </p>
        </section>

        {/* Part 2 — Ad 1 (after 3 sections) */}
        <AdUnit />
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            How to Avoid Being Fetishized or Tokenized
          </h2>
          <p>
            Not everyone who admires your culture is genuinely interested in{" "}
            <em>you</em>. Some people want the “exotic experience” or the
            “African fantasy.” You’re not an experiment, a checkbox, or a
            storyline for their friends. You’re a human being with depth.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Watch their language:</strong> If they obsess over your
              skin, accent, or “African body,” pause.
            </li>
            <li>
              <strong>Are they interested in your mind?</strong> Do they ask
              meaningful questions?
            </li>
            <li>
              <strong>Do they see you as an individual?</strong> Or do they
              generalize you to “Africans”?
            </li>
            <li>
              <strong>Test for real curiosity:</strong> Do they learn about you
              at a soul level or surface level?
            </li>
          </ul>
          <p>
            A healthy partner will admire your culture, not fetishize your
            identity. They will see your uniqueness without reducing you to a
            stereotype.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Respect, Consent & Cultural Sensitivity
          </h2>
          <p>
            Respect is universal, but how it’s expressed varies across cultures.
            Nigerians often show respect through tone, greetings, and honouring
            elders. In many Western cultures, respect shows through boundaries,
            equality, and direct communication.
          </p>
          <p>Bridge the gap by discussing expectations openly:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Teach your partner lovingly</strong> how respect works in
              your culture.
            </li>
            <li>
              <strong>Learn theirs too</strong> so you don’t misinterpret
              honesty as disrespect.
            </li>
            <li>
              <strong>Consent is key:</strong> Emotional, verbal, cultural,
              physical—always check comfort levels.
            </li>
          </ul>
          <p>
            The healthiest relationships balance both worlds: warmth + autonomy,
            closeness + boundaries.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            Handling External Opinions and Social Pressure
          </h2>
          <p>
            Cross-cultural couples attract attention—sometimes admiration,
            sometimes unsolicited opinions. Friends may be curious, aunties may
            gossip, social media may assume things, strangers may stare. Prepare
            mentally.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Not everyone needs explanations:</strong> Protect your
              peace.
            </li>
            <li>
              <strong>Set boundaries with family:</strong> “We appreciate your
              concern, but we’re building this ourselves.”
            </li>
            <li>
              <strong>Don’t make love a debate topic:</strong> You’re not here
              to convince the world—just to love well.
            </li>
          </ul>
          <p>
            Your relationship is between the two of you—others are spectators,
            not decision-makers.
          </p>
        </section>

        {/* Part 2 — Ad 2 (after 3 more sections) */}
        <AdUnit />
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            If Relocation or Marriage Enters the Chat
          </h2>
          <p>
            When cross-cultural relationships get serious, relocation and
            marriage naturally become part of the conversation. This stage needs
            maturity, planning, and patience—no rushing because of excitement or
            visa pressure.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Discuss future plans early:</strong> Who is more open to
              relocation? Is there a neutral country option?
            </li>
            <li>
              <strong>
                Research legal and immigration processes together:
              </strong>{" "}
              Transparency prevents resentment.
            </li>
            <li>
              <strong>Don’t relocate blindly:</strong> Visit first if possible.
              Sample the lifestyle, culture, and community.
            </li>
          </ul>
          <p>
            Marriage should feel like partnership—not escape, not rescue, not
            transaction. If the relationship is strong, relocation becomes a
            strategic decision, not a sacrifice of identity or dreams.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            The Visa Conversation: How to Handle It With Grace
          </h2>
          <p>
            Visa talk can be delicate—handled poorly, it looks like desperation
            or opportunism. Handled wisely, it becomes a practical discussion
            about building a life together.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Don’t bring it up too early:</strong> Let the relationship
              have a foundation.
            </li>
            <li>
              <strong>Discuss logistics with maturity:</strong> If long-term
              plans require visas, talk openly and calmly.
            </li>
            <li>
              <strong>Protect each other from stereotype:</strong> “Visa
              chasing” is a common assumption—be transparent so no insecurity
              grows.
            </li>
          </ul>
          <p>
            Remember: if the love is real, both of you will handle documents
            like a team—not like a favour from one side.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            If Things End: How to Exit With Dignity
          </h2>
          <p>
            Not all relationships are meant to end in marriage—and that’s okay.
            What matters is how you exit. Leave with dignity, respect, and
            grace, not bitterness or insults about culture or race.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Don’t generalize: One breakup doesn’t define an entire race or
              culture.
            </li>
            <li>
              Return belongings respectfully, unfollow gradually if needed, and
              heal privately.
            </li>
            <li>
              Reflect on lessons: What did this teach you about love,
              boundaries, and compatibility?
            </li>
          </ul>
          <p>
            A breakup handled with maturity builds character—and prepares you
            for the love that will stay.
          </p>
        </section>

        {/* Part 2 — Final Ad */}
        <AdUnit />

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            If It Blossoms into Marriage: Blending Two Worlds Beautifully
          </h2>
          <p>
            If your love leads to marriage, you’re not just merging two
            hearts—you’re merging families, traditions, values, and histories.
            This is a gift when handled with respect.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Create joint traditions:</strong> Blend holidays, meals,
              languages, and family rituals.
            </li>
            <li>
              <strong>Celebrate differences:</strong> Instead of “whose culture
              is right,” ask: “How do we honour both?”
            </li>
            <li>
              <strong>Raise children with richness:</strong> Teach them pride in
              both sides of their heritage.
            </li>
          </ul>
          <p>
            Cross-cultural marriages done well create children with empathy,
            adaptability, confidence, and global identity. It’s a beautiful
            legacy.
          </p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-bold">Final Words of Wisdom</h2>
          <p>
            Love is not a continent. Love is not an accent. Love is not a
            passport. Love is two humans choosing each other daily with respect,
            curiosity, humour, and patience.
          </p>
          <p>
            If you love an Oyinbo person—or hope to one day—love well, love
            wisely, and love with dignity. Keep your culture, keep your values,
            and keep your joy. The goal is not to “catch” anybody. The goal is
            to build a relationship where two cultures meet—and both feel at
            home.
          </p>
          <p>
            And remember, whether your soulmate is from Lagos, London, Lisbon,
            or Los Angeles—good character, emotional maturity, and genuine
            connection will always be the finest love language.
          </p>
        </section>

        <footer className="mt-12 pt-6 border-t border-slate-200 text-slate-600">
          <p>
            If this guide helped, share it with a friend who’s whispering “God,
            when?”—and tell them to read it with small chops.
          </p>
        </footer>
      </main>
    </MainLayout>
  );
}
