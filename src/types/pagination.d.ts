 /**
 * @file Pagination Type Definitions
 * @version 1.0.0
 * @since 1.0.0
 * @author James Druhan <jdruhan@canada.canon.com>
 * @license Copyright (c) James Druhan
 */

import type { ServiceRecord } from '@/types/service_catalog';

/**
 * Pagination Set Interface
 * 
 * @param { any } [pageItems] - Items array of services to display on the page.
 * @param { number } [totalItems] - Total items returned by the API call.
 * @param { number } [firstItemIndex] - Index of the first item listed on the page.
 * @param { number } [lastItemIndex] - Index of the last item listed on the page.
 * @param { boolean } [isNext] - Flag indicating if there is a next page.
 * @param { boolean } [isPrevious] - Flag indicating if there is a previous page.
 */
export interface PaginationSet
{
    pageItems?: ServiceRecord[],
    totalItems?: number,
    firstItemIndex?: number,
    lastItemIndex?: number
    isNext?: boolean,
    isPrevious?: boolean
}