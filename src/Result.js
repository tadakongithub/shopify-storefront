import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const FEED_QUERY = gql`
  {
    products(first: 50) {
      edges {
        node {
          id
          title
          description
          variants(first: 50) {
            edges {
              node {
                availableForSale
                id
                image {
                  originalSrc
                }
                priceV2 {
                  amount
                  currencyCode
                }
                title
              }
            }
          }
        }
      }
    }
  }
`;

class Result extends Component {
  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          const edges = data.products.edges;

          return (
            <div>
              {edges.map((product) => (
                <div key={product.node.id}>
                  <h2>{product.node.title}</h2>
                  <img
                    src={product.node.variants.edges[0].node.image.originalSrc}
                  ></img>
                  <div>{product.node.description}</div>
                  <div>
                    {product.node.variants.edges[0].node.priceV2.amount} /
                    {product.node.variants.edges[0].node.priceV2.currencyCode}
                  </div>
                </div>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Result;
