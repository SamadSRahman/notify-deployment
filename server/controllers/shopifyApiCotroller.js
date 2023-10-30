import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import Cryptr from "cryptr";
import SessionModel from "../models/SessionModels.js";

const cryption = new Cryptr(process.env.ENCRYPTION_STRING);

export const getAllSegment = async (req, res) => {

  try {

    const shop = req.query.shop;
    
    const [ , sessionDetail] = await SessionModel.findAll({where : {shop : shop}})
     
    if (sessionDetail === null) {
      return undefined;
    }
    if (sessionDetail.content.length == 0) {
      return undefined;
    }

    const { accessToken } = JSON.parse(cryption.decrypt(sessionDetail.content));

    const shopifyGraphQLEndpoint = `https://${sessionDetail.shop}/admin/api/2023-04/graphql.json`;

    const graphqlQuery = `
      {
        segments(first: 100) {
          edges {
            node {
              creationDate
              id
              lastEditDate
              name
              query
            }
          }
        }
      }
    `;

    const axiosShopifyConfig = {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
    };

    const fetchSegment = await axios.post(
      shopifyGraphQLEndpoint,
      { query: graphqlQuery },
      axiosShopifyConfig
    );

    const segments = fetchSegment?.data?.data?.segments?.edges?.map((edge) => edge.node);

    return res.status(200).json({
      success: true,
      segments
    });

  } catch (error) {
    res.status(500).json({ success: false, message : error.message });
  }
};

export const getProduct = async (req, res) => {

  try {

    const shop = req.query.shop;
    
    const [ , sessionDetail] = await SessionModel.findAll({where : {shop : shop}})
  
    if (sessionDetail === null) {
      return undefined;
    }
    if (sessionDetail.content.length == 0) {
      return undefined;
    }

    const { accessToken } = JSON.parse(cryption.decrypt(sessionDetail.content));

    const shopifyGraphQLEndpoint = `https://${sessionDetail.shop}/admin/api/2023-04/graphql.json`;

    const graphqlQuery = `
      {
        products(first: 100) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    `;

    const axiosShopifyConfig = {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
    };

    const fetchProducts = await axios.post(
      shopifyGraphQLEndpoint,
      { query: graphqlQuery },
      axiosShopifyConfig
    );

    const products = fetchProducts?.data?.data?.products?.edges?.map((edge) => edge.node);

    return res.status(200).json({
      success: true,
      products
    });

  } catch (error) {
    res.status(500).json({ success: false, message : error.message });
  }
};

