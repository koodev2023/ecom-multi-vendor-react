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

import { mapValues } from '../runtime';
import type { User } from './User';
import {
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
    UserToJSONTyped,
} from './User';
import type { Product } from './Product';
import {
    ProductFromJSON,
    ProductFromJSONTyped,
    ProductToJSON,
    ProductToJSONTyped,
} from './Product';

/**
 * 
 * @export
 * @interface Wishlist
 */
export interface Wishlist {
    /**
     * 
     * @type {number}
     * @memberof Wishlist
     */
    id?: number;
    /**
     * 
     * @type {User}
     * @memberof Wishlist
     */
    user?: User;
    /**
     * 
     * @type {Set<Product>}
     * @memberof Wishlist
     */
    products?: Set<Product>;
}

/**
 * Check if a given object implements the Wishlist interface.
 */
export function instanceOfWishlist(value: object): value is Wishlist {
    return true;
}

export function WishlistFromJSON(json: any): Wishlist {
    return WishlistFromJSONTyped(json, false);
}

export function WishlistFromJSONTyped(json: any, ignoreDiscriminator: boolean): Wishlist {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'user': json['user'] == null ? undefined : UserFromJSON(json['user']),
        'products': json['products'] == null ? undefined : (new Set((json['products'] as Array<any>).map(ProductFromJSON))),
    };
}

export function WishlistToJSON(json: any): Wishlist {
    return WishlistToJSONTyped(json, false);
}

export function WishlistToJSONTyped(value?: Wishlist | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'user': UserToJSON(value['user']),
        'products': value['products'] == null ? undefined : (Array.from(value['products'] as Set<any>).map(ProductToJSON)),
    };
}

