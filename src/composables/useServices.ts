 /**
 * @file Retrieves and processes services from DB.
 * @version 1.0.0
 * @since 1.0.0
 * @author James Druhan <jdruhan@canada.canon.com>
 * @license Copyright (c) James Druhan
 */

import { ref, onBeforeMount, Ref, watch, reactive } from 'vue';
import axios from 'axios';

import type { PaginationSet } from '@/types/pagination';

/**
 * Retrieves and processes services from DB.
 * 
 * @param { Ref <string> } [searchQuery] - Client search value.
 * @param { Ref <number> } [currentPage] - Current page of pagination the user is on. Used for pagination calculations.
 * @param { Ref <number> } [maxPageItems] - Maximum number of services allowable to display on a page.
 * 
 * @returns { services, loading } - Returns object that holds `services` including pagination data as well as a `loading` flag for retrieve updates.
 */
export default function useServices( searchQuery : Ref <string>, currentPage : Ref <number>, maxPageItems : Ref <number> ) : any
{
	// Initialize return values.
	const services : PaginationSet = reactive<PaginationSet>({});
	const loading : Ref<boolean> = ref<boolean>(false);

	// Get services and process pagination.
	const getServices = async (): Promise<any> =>
	{
		// Initialize loading state
		loading.value = true;

		// Define initial query value to DB.
		let queryValue = '/api/services';

		// Append the query if a search value is found.
		if ( searchQuery?.value )
		{
			queryValue = queryValue + `?q=${ searchQuery.value }`;
		}

		try
		{
			// Fetch data from the API
			const result = await axios.get( queryValue );

			// Sort by name.
			// TODO: This could be extracted or could instead use a lib such as lodash.
			result.data.sort( ( a : any, b : any ) =>
			{
				const itemA = a.name.toUpperCase();
				const itemB = b.name.toUpperCase();

				if ( itemA < itemB ) { return -1; }
				if ( itemA > itemB ) { return 1; }
		
				return 0;
			});

			// Define the total services received
			const totalItems : number = result.data.length;

			let firstIndex : number;
			let lastIndex : number;

			// Check for pagination requirement.
			if ( result.data.length > maxPageItems.value )
			{
				// Calculate the indexes of the data set based on the page.
				firstIndex = ( currentPage.value * maxPageItems.value ) - maxPageItems.value;
				lastIndex = ( currentPage.value * maxPageItems.value );

				if ( lastIndex > totalItems )
				{
					lastIndex = totalItems;
				}

				// Set the searches to a portion of the total (based on indexes).
				services.pageItems = result.data.slice( firstIndex, lastIndex );

				// Set flag for previous page button.
				services.isPrevious = currentPage.value > 1;

				// Set flag for next page button.
				services.isNext = ( totalItems - 1 ) > lastIndex;
			}
			else
			{
				// Calculate the indexes of the data set based on the page.
				firstIndex = 0;
				lastIndex = totalItems;

				// Set the data to display.
				services.pageItems = result.data;
				services.isNext = false;
				services.isPrevious = false;
			}

			// Set remaining pagination data.
			services.firstItemIndex = firstIndex + 1;
			services.lastItemIndex = lastIndex;
			services.totalItems = totalItems;
		}
		catch( e )
		{
			// TODO: Error handling.
		}

		// Reset loading state
		loading.value = false;
	};

	let isTyping : boolean = false;
	let debounce : any = null;

	// Watches for changes to the search value and refreshes data.
	// TODO: This debouce was hand written but also could extract this or use a lib such as lodash.
	watch( searchQuery, async ( new_search, old_search ) =>
	{
		loading.value = true

		// Debounce for search.
		const prepSearch = () =>
		{
			debounce = setTimeout( async () =>
			{
				// Fetch services from the API.
				await getServices();

				isTyping = false;
			}, 400 );
		}

		// If user just started typing start debounce process.
		if ( !isTyping )
		{
			isTyping = true;

			prepSearch()
		}
		// If user was in the process of type, clear old debounce and start from scratch.
		else
		{
			clearTimeout( debounce );

			prepSearch();
		}
		
	});

	// Watches for changes to the current page to refresh services.
	watch( currentPage, async ( new_currentPage, old_currentPage ) =>
	{
		// Fetch services from the API
		await getServices();
	});

	// Add lifecycle hook to get services on initial load.
	onBeforeMount( async (): Promise<void> =>
	{
		// Fetch services from the API
		await getServices()
	});

	// Return stateful data
	return {
		services,
		loading
	}
}
