import Layout from "@theme/Layout";
import React from "react";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default () => {
  const {siteConfig} = useDocusaurusContext();
  const {baseUrl} = siteConfig;
  return (
    <Layout title="NeonJS">
      <div class="hero hero--primary">
        <div class="container">
          <h1 class="hero__title">epicvault-js</h1>
          <p class="hero__subtitle">The JavaScript SDK for EpicChain Blockchain is a powerful library designed to simplify the integration of EpicChain blockchain features into JavaScript-based applications.</p>
          <div>
            <a
              class="button button--secondary button--outline button--lg"
              href={baseUrl + "docs"}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col col--4">
            <div class="card__header">
              <h3>Web ready</h3>
            </div>
            <div class="card__body">
              <p>
              Written in TypeScript, the EpicChain JavaScript SDK is designed for deployment in both browser and server environments.
              </p>
            </div>
          </div>
          <div class="col col--4">
            <div class="card__header">
              <h3>Targeted for all levels</h3>
            </div>
            <div class="card__body">
              <p>
              The EpicChain JavaScript SDK offers various API interfaces tailored for different users. Beginners can start by following the easy-to-understand tutorials and utilize the prebuilt facade methods, which provide a simplified way to interact with the EpicChain blockchain.
              </p>
            </div>
          </div>
          <div class="col col--4">
            <div class="card__header">
              <h3>Open sourced</h3>
            </div>
            <div class="card__body">
              <p>
              The EpicChain JavaScript SDK is MIT-licensed, meaning it is completely free to use with no fees or hidden strings attached.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
