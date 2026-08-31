import Link from "next/link";
import { getAllPosts, urlFor } from "../lib/sanity";
import Footer from "../components/Footer";

export const revalidate = 30; // ξαναφέρνει περιεχόμενο από το Sanity κάθε 30 δευτ.

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("el-GR", { day: "2-digit", month: "2-digit" });
}

export default async function Home() {
  const posts = (await getAllPosts()) || [];

  const articles = posts.filter((p) => p.section === "test");
  const news = posts.filter((p) => p.section === "news");
  const guides = posts.filter((p) => p.section === "guide");
  const featured = articles[0] || posts[0];

  return (
    <>
      <header>
        <Link href="/" className="logo">
          <div className="mark">
            ΣΤΡΟ<span>Φ</span>ΕΣ
          </div>
          <div className="tagline">Ό,τι κινείται, το εξετάζουμε</div>
        </Link>
        <nav>
          <a href="#reviews">Δοκιμές</a>
          <a href="#news">Νέα</a>
          <a href="#guides-section">Οδηγοί Αγοράς</a>
          <Link href="/epikoinonia">Επικοινωνία</Link>
        </nav>
      </header>

      <section className="hero" style={{ position: "relative" }}>
        <div className="grid-bg"></div>
        <div className="hero-inner">
          <div>
            <div className="eyebrow mono">
              {featured ? "Featured Δοκιμή" : "Καλώς ήρθες"}
            </div>
            <h1 className="display">
              Πίσω από
              <br />
              το τιμόνι
            </h1>
            <p className="lead">
              {featured
                ? featured.excerpt ||
                  "Δοκιμάσαμε το νέο μοντέλο στο δρόμο, όχι μόνο στο χαρτί."
                : "Δοκιμές, νέα και οδηγοί αγοράς αυτοκινήτων για την ελληνική αγορά. Νέο περιεχόμενο έρχεται σύντομα."}
            </p>
            {featured && (
              <Link href={`/arthro/${featured.slug}`} className="hero-cta">
                Διάβασε τη δοκιμή →
              </Link>
            )}
          </div>
          {featured && (
            <div className="spec-panel">
              <div className="spec-model display">{featured.title}</div>
              <div className="spec-sub">
                {(featured.category || "").toUpperCase()}
              </div>
              <div className="gauge-row">
                {featured.score && (
                  <div className="gauge">
                    <svg width="96" height="96" viewBox="0 0 96 96">
                      <circle className="gauge-track" cx="48" cy="48" r="40" />
                      <circle
                        className="gauge-fill"
                        cx="48"
                        cy="48"
                        r="40"
                        style={{ "--score": parseFloat(featured.score) || 0 }}
                      />
                    </svg>
                    <div className="gauge-num">
                      <b>{featured.score}</b>
                      <small>ΒΑΘΜΟΛΟΓΙΑ</small>
                    </div>
                  </div>
                )}
                <div className="spec-list">
                  <div>
                    <span>Κατηγορία</span>
                    <b>{featured.category || "—"}</b>
                  </div>
                  <div>
                    <span>Ετικέτα</span>
                    <b>{featured.tag || "—"}</b>
                  </div>
                  <div>
                    <span>Χρόνος ανάγνωσης</span>
                    <b>{featured.readTime || "—"}</b>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section" id="reviews">
        <div className="section-head">
          <h2>Τελευταίες Δοκιμές</h2>
        </div>
        {articles.length ? (
          <div className="cards">
            {articles.map((a) => (
              <ReviewCard
                key={a._id}
                slug={a.slug}
                image={a.mainImage}
                tag={a.tag}
                cat={a.category}
                title={a.title}
                desc={a.excerpt}
                score={a.score}
                time={a.readTime}
              />
            ))}
          </div>
        ) : (
          <p className="empty-note">Έρχονται σύντομα νέες δοκιμές.</p>
        )}
      </section>

      <section className="section news-strip" id="news">
        <div className="section-head">
          <h2>Νέα</h2>
        </div>
        {news.length ? (
          <div className="news-list">
            {news.map((n) => (
              <NewsItem key={n._id} slug={n.slug} date={formatDate(n.publishedAt)} title={n.title} />
            ))}
          </div>
        ) : (
          <p className="empty-note">Έρχονται σύντομα νέα.</p>
        )}
      </section>

      <section className="section" id="guides-section">
        <div className="section-head">
          <h2>Οδηγοί Αγοράς</h2>
        </div>
        {guides.length ? (
          <div className="guides">
            {guides.map((g, i) => (
              <GuideCard
                key={g._id}
                slug={g.slug}
                image={g.mainImage}
                num={String(i + 1).padStart(2, "0")}
                title={g.title}
                desc={g.excerpt}
              />
            ))}
          </div>
        ) : (
          <p className="empty-note">Έρχονται σύντομα οδηγοί αγοράς.</p>
        )}
      </section>

      <Footer />
    </>
  );
}

function ReviewCard({ slug, image, tag, cat, title, desc, score, time }) {
  const content = (
    <>
      <div className="card-media">
        {image ? (
          <img src={urlFor(image).width(500).height(280).url()} alt={title} />
        ) : (
          <svg viewBox="0 0 200 80" fill="none">
            <path
              d="M10 55 Q20 30 55 28 L75 20 L130 20 L155 30 Q185 32 190 55 L185 58 Q180 45 165 45 Q152 45 150 58 L60 58 Q58 45 45 45 Q32 45 28 58 Z"
              stroke="#E7EAEA"
              strokeWidth="2"
            />
            <circle cx="47" cy="58" r="9" stroke="#E7EAEA" strokeWidth="2" />
            <circle cx="163" cy="58" r="9" stroke="#E7EAEA" strokeWidth="2" />
          </svg>
        )}
        {tag && <div className="card-tag">{tag}</div>}
      </div>
      <div className="card-body">
        <div className="card-cat">{cat}</div>
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="card-foot">
          <span className="mini-score">{score}</span>
          <span>{time}</span>
        </div>
      </div>
    </>
  );

  if (slug) {
    return (
      <Link href={`/arthro/${slug}`} className="card article-card-link">
        {content}
      </Link>
    );
  }

  return <div className="card">{content}</div>;
}

function NewsItem({ slug, date, title }) {
  const content = (
    <>
      <div className="news-date mono">{date}</div>
      <h4>{title}</h4>
      <div className="arrow">→</div>
    </>
  );

  if (slug) {
    return (
      <Link href={`/arthro/${slug}`} className="news-item">
        {content}
      </Link>
    );
  }

  return <div className="news-item">{content}</div>;
}

function GuideCard({ slug, image, num, title, desc }) {
  const content = (
    <>
      {image && (
        <div className="guide-media">
          <img src={urlFor(image).width(400).height(220).url()} alt={title} />
        </div>
      )}
      <div className="num mono">{num}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </>
  );

  if (slug) {
    return (
      <Link href={`/arthro/${slug}`} className="guide">
        {content}
      </Link>
    );
  }

  return <div className="guide">{content}</div>;
}
