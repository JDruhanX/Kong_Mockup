 /**
 * @file Service Catalog Type Definitions
 * @version 1.0.0
 * @since 1.0.0
 * @author James Druhan <jdruhan@canada.canon.com>
 * @license Copyright (c) James Druhan
 */

/**
 * Service Record Interface
 * 
 * @param { string } [id] - UUID of the service.
 * @param { string } [name] - Name of the service.
 * @param { boolean } [published] - Flag indicating if service is published.
 * @param { string } [type] - Flag indicating the type of service.
 * @param { boolean } [configured] - Flag indicating configuration status of the service.
 * @param { string } [description] - Description of the service.
 * @param { ServiceRecordMetrics } [metrics] - Metrics object of the service.
 * @param { ServiceRecordVersion[] } [version] - Version object of the service.
 */
export interface ServiceRecord
{
    id?: string,
    name: string,
    published: boolean,
    type: string,
    configured?: boolean,
    description?: string,
    metrics?: ServiceRecordMetrics,
    versions: ServiceRecordVersion[]
}

/**
 * Service Record Metrics Interface
 * 
 * @param { number } [error] - Value indicating any errors in the service.
 * @param { number } [latency] - Value indicating latency in the service.
 * @param { number } [requests] - Value indicating any requests in the service.
 * @param { number } [uptime] - Value indicating uptime of the service.
 */
export interface ServiceRecordMetrics
{
    errors?: number,
    latency?: number,
    requests?: number,
    uptime?: number,
}

/**
 * Service Record Version Interface
 * 
 * @param { string } [id] - UUID of the version.
 * @param { string } [name] - Name of the version.
 * @param { string } [description] - Description of the version.
 * @param { string } [updated_at] - Last updated date/time of the service.
 */
export interface ServiceRecordVersion
{
    id?: string,
    name?: string,
    description?: string,
    updated_at?: string
    developer?: ServiceRecordVersionDeveloper
}

/**
 * Service Record Version Interface
 * 
 * @param { string } [id] - UUID of the version.
 * @param { string } [name] - Name of the developer.
 * @param { string } [email] - Email of developer.
 * @param { string } [avatar] - URL of developer image.
 */
 export interface ServiceRecordVersionDeveloper
 {
     id?: string,
     name?: string,
     email?: string,
     avatar?: string
 }