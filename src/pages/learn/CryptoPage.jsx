// src/pages/learn/CryptoPage.jsx
import ArticleLayout from '../../components/ArticleLayout';

export default function CryptoPage() {
  return (
    <ArticleLayout topicPath="crypto">
      <h2>What Is Cryptocurrency?</h2>
      <p>
        Cryptocurrency is a digital or virtual currency secured by cryptography, which makes it nearly
        impossible to counterfeit or double-spend. Bitcoin was introduced in 2008 and remains the most
        popular. Ethereum introduced smart contracts in 2015. Top cryptos by market cap include Bitcoin,
        Ethereum, Tether, Solana, Tezos, EOS, and ZCash.
      </p>
      <h2>How Blockchain Works</h2>
      <p>
        Cryptocurrencies run on a distributed public ledger called blockchain — a record of all
        transactions updated and held by currency holders. Units are created through mining, a process
        using computer power to solve complex mathematical problems. They operate in a decentralized,
        peer-to-peer network without any central authority.
      </p>
      <img src="/cryptography.png" alt="Cryptography" className="article-image" />
      <iframe className="article-video"
        src="https://www.youtube.com/embed/GQvu49c0ZZc"
        title="What is Cryptocurrency"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </ArticleLayout>
  );
}
