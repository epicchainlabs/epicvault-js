import Layout from "@theme/Layout";
import React from "react";

export default () => {
  return (
    <Layout>
      <div class="hero hero--primary">
        <div class="container">
          <h1 class="hero__title">Looking for help?</h1>
          <div></div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col col--4">
            <div class="card">
              <div class="card__header">
                <h3>Discussion</h3>
              </div>
              <div class="card__body">
                <p>
                For everything related to the EpicChain ecosystem, be sure to visit EpicChain Lab's forums. It's the go-to place for discussions, updates, technical support, and collaboration opportunities within the community.
                </p>
              </div>
              <div class="card__footer">
                <a
                  class="button button--secondary button--block"
                  href="https://forum.coz.io/c/technical/6"
                >
                  Forum
                </a>
              </div>
            </div>
          </div>

          <div class="col col--4">
            <div class="card">
              <div class="card__header">
                <h3>Bug</h3>
              </div>
              <div class="card__body">
                <p>
                If you encounter an issue that seems like a bug, don't hesitate to open an issue directly on our GitHub repository.
                </p>
              </div>
              <div class="card__footer">
                <a
                  class="button button--secondary button--block"
                  href="https://github.com/epicchainlabs/epicvault-js"
                >
                  Github
                </a>
              </div>
            </div>
          </div>

          <div class="col col--4">
            <div class="card">
              <div class="card__header">
                <h3>Other issues</h3>
              </div>
              <div class="card__body">
                <p>For non-technical discussion, there is always Twitter.</p>
              </div>
              <div class="card__footer">
                <a
                  class="button button--secondary button--block"
                  href="https://www.x.com/epicchainlabs/"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
