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
  AddCartItemRequestDto,
  Cart,
  CartItem,
  ModelApiResponse,
  UpdateCartItemRequestDto,
} from '../models/index';
import {
    AddCartItemRequestDtoFromJSON,
    AddCartItemRequestDtoToJSON,
    CartFromJSON,
    CartToJSON,
    CartItemFromJSON,
    CartItemToJSON,
    ModelApiResponseFromJSON,
    ModelApiResponseToJSON,
    UpdateCartItemRequestDtoFromJSON,
    UpdateCartItemRequestDtoToJSON,
} from '../models/index';

export interface AddItemToCartHandlerRequest {
    authorization: string;
    addCartItemRequestDto: AddCartItemRequestDto;
}

export interface DeleteCartItemHandlerRequest {
    authorization: string;
    cartItemId: number;
}

export interface FindUserCartHandlerRequest {
    authorization: string;
}

export interface UpdateCartItemHandlerRequest {
    authorization: string;
    cartItemId: number;
    updateCartItemRequestDto: UpdateCartItemRequestDto;
}

/**
 * 
 */
export class CartControllerApi extends runtime.BaseAPI {

    /**
     */
    async addItemToCartHandlerRaw(requestParameters: AddItemToCartHandlerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CartItem>> {
        if (requestParameters['authorization'] == null) {
            throw new runtime.RequiredError(
                'authorization',
                'Required parameter "authorization" was null or undefined when calling addItemToCartHandler().'
            );
        }

        if (requestParameters['addCartItemRequestDto'] == null) {
            throw new runtime.RequiredError(
                'addCartItemRequestDto',
                'Required parameter "addCartItemRequestDto" was null or undefined when calling addItemToCartHandler().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters['authorization'] != null) {
            headerParameters['Authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/carts/items`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AddCartItemRequestDtoToJSON(requestParameters['addCartItemRequestDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CartItemFromJSON(jsonValue));
    }

    /**
     */
    async addItemToCartHandler(requestParameters: AddItemToCartHandlerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CartItem> {
        const response = await this.addItemToCartHandlerRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async deleteCartItemHandlerRaw(requestParameters: DeleteCartItemHandlerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ModelApiResponse>> {
        if (requestParameters['authorization'] == null) {
            throw new runtime.RequiredError(
                'authorization',
                'Required parameter "authorization" was null or undefined when calling deleteCartItemHandler().'
            );
        }

        if (requestParameters['cartItemId'] == null) {
            throw new runtime.RequiredError(
                'cartItemId',
                'Required parameter "cartItemId" was null or undefined when calling deleteCartItemHandler().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['Authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/carts/items/{cartItemId}`.replace(`{${"cartItemId"}}`, encodeURIComponent(String(requestParameters['cartItemId']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ModelApiResponseFromJSON(jsonValue));
    }

    /**
     */
    async deleteCartItemHandler(requestParameters: DeleteCartItemHandlerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ModelApiResponse> {
        const response = await this.deleteCartItemHandlerRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async findUserCartHandlerRaw(requestParameters: FindUserCartHandlerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Cart>> {
        if (requestParameters['authorization'] == null) {
            throw new runtime.RequiredError(
                'authorization',
                'Required parameter "authorization" was null or undefined when calling findUserCartHandler().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters['authorization'] != null) {
            headerParameters['Authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/carts`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CartFromJSON(jsonValue));
    }

    /**
     */
    async findUserCartHandler(requestParameters: FindUserCartHandlerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Cart> {
        const response = await this.findUserCartHandlerRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async updateCartItemHandlerRaw(requestParameters: UpdateCartItemHandlerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CartItem>> {
        if (requestParameters['authorization'] == null) {
            throw new runtime.RequiredError(
                'authorization',
                'Required parameter "authorization" was null or undefined when calling updateCartItemHandler().'
            );
        }

        if (requestParameters['cartItemId'] == null) {
            throw new runtime.RequiredError(
                'cartItemId',
                'Required parameter "cartItemId" was null or undefined when calling updateCartItemHandler().'
            );
        }

        if (requestParameters['updateCartItemRequestDto'] == null) {
            throw new runtime.RequiredError(
                'updateCartItemRequestDto',
                'Required parameter "updateCartItemRequestDto" was null or undefined when calling updateCartItemHandler().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters['authorization'] != null) {
            headerParameters['Authorization'] = String(requestParameters['authorization']);
        }

        const response = await this.request({
            path: `/carts/items/{cartItemId}`.replace(`{${"cartItemId"}}`, encodeURIComponent(String(requestParameters['cartItemId']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: UpdateCartItemRequestDtoToJSON(requestParameters['updateCartItemRequestDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CartItemFromJSON(jsonValue));
    }

    /**
     */
    async updateCartItemHandler(requestParameters: UpdateCartItemHandlerRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CartItem> {
        const response = await this.updateCartItemHandlerRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
