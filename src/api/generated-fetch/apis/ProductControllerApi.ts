/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  PageProduct,
  Product,
} from '../models/index';
import {
    PageProductFromJSON,
    PageProductToJSON,
    ProductFromJSON,
    ProductToJSON,
} from '../models/index';

export interface GetAllProductsRequest {
    category?: string;
    brand?: string;
    color?: string;
    size?: string;
    minPrice?: number;
    maxPrice?: number;
    minDiscount?: number;
    sort?: string;
    stock?: string;
    pageNumber?: number;
}

export interface GetProductByIdRequest {
    productId: number;
}

export interface SearchProductRequest {
    query?: string;
}

/**
 * 
 */
export class ProductControllerApi extends runtime.BaseAPI {

    /**
     */
    async getAllProductsRaw(requestParameters: GetAllProductsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PageProduct>> {
        const queryParameters: any = {};

        if (requestParameters['category'] != null) {
            queryParameters['category'] = requestParameters['category'];
        }

        if (requestParameters['brand'] != null) {
            queryParameters['brand'] = requestParameters['brand'];
        }

        if (requestParameters['color'] != null) {
            queryParameters['color'] = requestParameters['color'];
        }

        if (requestParameters['size'] != null) {
            queryParameters['size'] = requestParameters['size'];
        }

        if (requestParameters['minPrice'] != null) {
            queryParameters['minPrice'] = requestParameters['minPrice'];
        }

        if (requestParameters['maxPrice'] != null) {
            queryParameters['maxPrice'] = requestParameters['maxPrice'];
        }

        if (requestParameters['minDiscount'] != null) {
            queryParameters['minDiscount'] = requestParameters['minDiscount'];
        }

        if (requestParameters['sort'] != null) {
            queryParameters['sort'] = requestParameters['sort'];
        }

        if (requestParameters['stock'] != null) {
            queryParameters['stock'] = requestParameters['stock'];
        }

        if (requestParameters['pageNumber'] != null) {
            queryParameters['pageNumber'] = requestParameters['pageNumber'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/products`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PageProductFromJSON(jsonValue));
    }

    /**
     */
    async getAllProducts(requestParameters: GetAllProductsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PageProduct> {
        const response = await this.getAllProductsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getProductByIdRaw(requestParameters: GetProductByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Product>> {
        if (requestParameters['productId'] == null) {
            throw new runtime.RequiredError(
                'productId',
                'Required parameter "productId" was null or undefined when calling getProductById().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/products/{productId}`.replace(`{${"productId"}}`, encodeURIComponent(String(requestParameters['productId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProductFromJSON(jsonValue));
    }

    /**
     */
    async getProductById(requestParameters: GetProductByIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Product> {
        const response = await this.getProductByIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async searchProductRaw(requestParameters: SearchProductRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Product>>> {
        const queryParameters: any = {};

        if (requestParameters['query'] != null) {
            queryParameters['query'] = requestParameters['query'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/products/search`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ProductFromJSON));
    }

    /**
     */
    async searchProduct(requestParameters: SearchProductRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Product>> {
        const response = await this.searchProductRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
