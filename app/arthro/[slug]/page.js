import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { getArticleBySlug, urlFor } from "../../../lib/sanity";
import Carousel from "../../../components/Carousel";
import Footer from "../../../components/Footer";

export const revalidate = 30;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Το άρθρο δεν βρέθηκε" };
  }

  const description =
    article.excerpt || `${article.title} — δοκιμή και ανάλυση από το ΣΤΡΟΦΕΣ.`;
  const imageUrl = article.mainImage
    ? urlFor(article.mainImage).width(1200).height(630).url()
    : undefined;

  return {
    title: article.title,
    description,
    alternates: { canonical: `/arthro/${slug}` },
    openGraph: {
      title: article.title,
      description,
      type: "article",
      url: `/arthro/${slug}`,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      title: article.title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

function getEmbedUrl(url) {
  if (!url) return null;

  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return null;
}

const portableTextComponents = {
  types: {
    image: ({ value }) => (
      <img
        src={urlFor(value).width(1200).url()}
        alt={value.alt || ""}
        className="body-image"
      />
    ),
    videoEmbed: ({ value }) => {
      const embedUrl = getEmbedUrl(value.url);
      if (!embedUrl) {
        return (
          <p className="video-embed-error">
            Μη έγκυρο link βίντεο: {value.url}
          </p>
        );
      }
      return (
        <div className="video-embed-wrap">
          <iframe
            src={embedUrl}
            title={value.caption || "Ενσωματωμένο βίντεο"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {value.caption && (
            <p className="video-embed-caption">{value.caption}</p>
          )}
        </div>
      );
    },
    imageCarousel: ({ value }) => <Carousel images={value.images} />,
  },
};

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="article-wrap">
        <p>Το άρθρο δεν βρέθηκε.</p>
        <Link href="/">← Πίσω στην αρχική</Link>
      </div>
    );
  }

  return (
    <>
      <header>
        <Link href="/" className="logo">
          <div className="mark">
            ΣΤΡΟ<span>Φ</span>ΕΣ
          </div>
        </Link>
        <nav>
          <a href="/#reviews">Δοκιμές</a>
          <a href="/#news">Νέα</a>
          <a href="/#guides-section">Οδηγοί Αγοράς</a>
          <Link href="/epikoinonia">Επικοινωνία</Link>
        </nav>
      </header>

      <article className="article-wrap">
        <Link href="/" className="back-link">
          ← Πίσω στην αρχική
        </Link>

        <div className="article-meta">
          {article.tag && <span className="card-tag static">{article.tag}</span>}
          <span className="card-cat">{article.category}</span>
        </div>

        <h1 className="article-title">{article.title}</h1>

        <div className="article-subrow mono">
          {article.score && <span className="mini-score">{article.score}</span>}
          {article.readTime && <span>{article.readTime}</span>}
        </div>

        {article.mainImage && (
          <img
            src={urlFor(article.mainImage).width(1600).url()}
            alt={article.mainImage.alt || article.title}
            className="article-hero-image"
          />
        )}

        {article.excerpt && <p className="article-excerpt">{article.excerpt}</p>}

        <div className="article-body">
          {article.body ? (
            <PortableText value={article.body} components={portableTextComponents} />
          ) : (
            <p>Το πλήρες κείμενο δεν έχει προστεθεί ακόμα.</p>
          )}
        </div>
      </article>

      <Footer />
    </>
  );
}
