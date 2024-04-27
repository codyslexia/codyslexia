import { transform } from '@shared/utils'

const HTTP_STATUS_DICTIONARY = [
  {
    code: 100,
    name: 'Continue',
    enum: 'CONTINUE',
    message: 'Request headers received; Please continue sending the request body',
  },
  {
    code: 101,
    name: 'Switching Protocols',
    enum: 'SWITCHING_PROTOCOLS',
    message: 'Switching to new protocol; obey Upgrade header',
  },
  {
    code: 102,
    name: 'Processing',
    enum: 'PROCESSING',
    message: 'Request received; please continue',
  },
  {
    code: 103,
    name: 'Early Hints',
    enum: 'EARLY_HINTS',
    message: 'Link sent; preload capabilities',
  },
  {
    code: 200,
    name: 'OK',
    enum: 'OK',
    message: 'Request fulfilled, document follows',
  },
  {
    code: 201,
    name: 'Created',
    enum: 'CREATED',
    message: 'Document created, URL follows',
  },
  {
    code: 202,
    name: 'Accepted',
    enum: 'ACCEPTED',
    message: 'Request accepted, processing continues off-line',
  },
  {
    code: 203,
    name: 'Non-Authoritative Information',
    enum: 'NON_AUTHORITATIVE_INFORMATION',
    message: 'Request fulfilled from alternative location',
  },
  {
    code: 204,
    name: 'No Content',
    enum: 'NO_CONTENT',
    message: 'Request fulfilled, nothing follows',
  },
  {
    code: 205,
    name: 'Reset Content',
    enum: 'RESET_CONTENT',
    message: 'Clear input form for further input',
  },
  {
    code: 206,
    name: 'Partial Content',
    enum: 'PARTIAL_CONTENT',
    message: 'Partial content follows',
  },
  {
    code: 207,
    name: 'Multi-Status',
    enum: 'MULTI_STATUS',
    message: 'XML document contains multiple status codes',
  },
  {
    code: 208,
    name: 'Already Reported',
    enum: 'ALREADY_REPORTED',
    message: 'Further extensions to the request are required',
  },
  {
    code: 226,
    name: 'IM Used',
    enum: 'IM_USED',
    message: 'Request fulfilled, resource might have changed',
  },
  {
    code: 300,
    name: 'Multiple Choices',
    enum: 'MULTIPLE_CHOICES',
    message: 'Object has several resources - see URI list',
  },
  {
    code: 301,
    name: 'Moved Permanently',
    enum: 'MOVED_PERMANENTLY',
    message: 'Object moved permanently - see URI list',
  },
  {
    code: 302,
    name: 'Found',
    enum: 'FOUND',
    message: 'Object moved temporarily - see URI list',
  },
  {
    code: 303,
    name: 'See Other',
    enum: 'SEE_OTHER',
    message: 'Object moved - see Method and URL list',
  },
  {
    code: 304,
    name: 'Not Modified',
    enum: 'NOT_MODIFIED',
    message: 'Object not modified since last requested',
  },
  {
    code: 305,
    name: 'Use Proxy',
    enum: 'USE_PROXY',
    message: 'You must use proxy specified in Location to access this resource',
  },
  {
    code: 307,
    name: 'Temporary Redirect',
    enum: 'TEMPORARY_REDIRECT',
    message: 'Object moved temporarily - see URI list',
  },
  {
    code: 308,
    name: 'Permanent Redirect',
    enum: 'PERMANENT_REDIRECT',
    message: 'Object moved permanently - see URI list',
  },
  {
    code: 400,
    name: 'Bad Request',
    enum: 'BAD_REQUEST',
    message: 'Bad request syntax or unsupported method',
  },
  {
    code: 401,
    name: 'Unauthorized',
    enum: 'UNAUTHORIZED',
    message: 'Unauthorized access to this resource',
  },
  {
    code: 402,
    name: 'Payment Required',
    enum: 'PAYMENT_REQUIRED',
    message: 'Payment required - no payment provided',
  },
  {
    code: 403,
    name: 'Forbidden',
    enum: 'FORBIDDEN',
    message: 'Request forbidden - authorization will not help',
  },
  {
    code: 404,
    name: 'Not Found',
    enum: 'NOT_FOUND',
    message: 'No resource found for the requested route',
  },
  {
    code: 405,
    name: 'Method Not Allowed',
    enum: 'METHOD_NOT_ALLOWED',
    message: 'Method is not allowed for the requested route',
  },
  {
    code: 406,
    name: 'Not Acceptable',
    enum: 'NOT_ACCEPTABLE',
    message: 'Not acceptable for content negotiation',
  },
  {
    code: 407,
    name: 'Proxy Authentication Required',
    enum: 'PROXY_AUTHENTICATION_REQUIRED',
    message: 'Proxy authentication required - client must first authenticate itself with the proxy',
  },
  {
    code: 408,
    name: 'Request Timeout',
    enum: 'REQUEST_TIMEOUT',
    message: 'Request timeout - server terminated connection',
  },
  {
    code: 409,
    name: 'Conflict',
    enum: 'CONFLICT',
    message: 'Request conflict with current state of server',
  },
  {
    code: 410,
    name: 'Gone',
    enum: 'GONE',
    message: 'Resource is no longer available (Gone)',
  },
  {
    code: 411,
    name: 'Length Required',
    enum: 'LENGTH_REQUIRED',
    message: 'Content length required (RFC 7231)',
  },
  {
    code: 412,
    name: 'Precondition Failed',
    enum: 'PRECONDITION_FAILED',
    message: 'Precondition failed (RFC 7232)',
  },
  {
    code: 413,
    name: 'Payload Too Large',
    enum: 'PAYLOAD_TOO_LARGE',
    message: 'Payload too large (RFC 7231)',
  },
  {
    code: 414,
    name: 'URI Too Long',
    enum: 'URI_TOO_LONG',
    message: 'URI too long (RFC 7231)',
  },
  {
    code: 415,
    name: 'Unsupported Media Type',
    enum: 'UNSUPPORTED_MEDIA_TYPE',
    message: 'Unsupported media type (RFC 7231)',
  },
  {
    code: 416,
    name: 'Range Not Satisfiable',
    enum: 'RANGE_NOT_SATISFIABLE',
    message: 'Range not satisfiable (RFC 7233)',
  },
  {
    code: 417,
    name: 'Expectation Failed',
    enum: 'EXPECTATION_FAILED',
    message: 'Expectation failed (RFC 7231)',
  },
  {
    code: 418,
    name: "I'm a teapot",
    enum: 'IM_A_TEAPOT',
    message: "I'm a teapot (RFC 2324)",
  },
  {
    code: 421,
    name: 'Misdirected Request',
    enum: 'MISDIRECTED_REQUEST',
    message: 'Misdirected request (for example because a connection reuse)',
  },
  {
    code: 422,
    name: 'Unprocessable Entity',
    enum: 'UNPROCESSABLE_ENTITY',
    message: 'Unprocessable entity (RFC 4918)',
  },
  {
    code: 423,
    name: 'Locked',
    enum: 'LOCKED',
    message: 'Locked (RFC 4918)',
  },
  {
    code: 424,
    name: 'Failed Dependency',
    enum: 'FAILED_DEPENDENCY',
    message: 'Failed dependency (RFC 4918)',
  },
  {
    code: 425,
    name: 'Too Early',
    enum: 'TOO_EARLY',
    message: 'Too early (RFC 8470)',
  },
  {
    code: 426,
    name: 'Upgrade Required',
    enum: 'UPGRADE_REQUIRED',
    message: 'Upgrade required (RFC 7231)',
  },
  {
    code: 428,
    name: 'Precondition Required',
    enum: 'PRECONDITION_REQUIRED',
    message: 'Precondition required (RFC 6585)',
  },
  {
    code: 429,
    name: 'Too Many Requests',
    enum: 'TOO_MANY_REQUESTS',
    message: 'Too many requests (RFC 6585)',
  },
  {
    code: 431,
    name: 'Request Header Fields Too Large',
    enum: 'REQUEST_HEADER_FIELDS_TOO_LARGE',
    message: 'Request header fields too large (RFC 6585)',
  },
  {
    code: 451,
    name: 'Unavailable For Legal Reasons',
    enum: 'UNAVAILABLE_FOR_LEGAL_REASONS',
    message: 'Unavailable for legal reasons (RFC 7725)',
  },
  {
    code: 500,
    name: 'Internal Server Error',
    enum: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error (RFC 7231)',
  },
  {
    code: 501,
    name: 'Not Implemented',
    enum: 'NOT_IMPLEMENTED',
    message: 'Not implemented (RFC 7231)',
  },
  {
    code: 502,
    name: 'Bad Gateway',
    enum: 'BAD_GATEWAY',
    message: 'Bad gateway (RFC 7231)',
  },
  {
    code: 503,
    name: 'Service Unavailable',
    enum: 'SERVICE_UNAVAILABLE',
    message: 'Service unavailable (RFC 7231)',
  },
  {
    code: 504,
    name: 'Gateway Timeout',
    enum: 'GATEWAY_TIMEOUT',
    message: 'Gateway timeout (RFC 7231)',
  },
  {
    code: 505,
    name: 'HTTP Version Not Supported',
    enum: 'HTTP_VERSION_NOT_SUPPORTED',
    message: 'HTTP version not supported (RFC 7231)',
  },
  {
    code: 506,
    name: 'Variant Also Negotiates',
    enum: 'VARIANT_ALSO_NEGOTIATES',
    message: 'Variant also negotiates (RFC 2295)',
  },
  {
    code: 507,
    name: 'Insufficient Storage',
    enum: 'INSUFFICIENT_STORAGE',
    message: 'Insufficient storage (RFC 4918)',
  },
  {
    code: 508,
    name: 'Loop Detected',
    enum: 'LOOP_DETECTED',
    message: 'Loop detected (RFC 5842)',
  },
  {
    code: 510,
    name: 'Not Extended',
    enum: 'NOT_EXTENDED',
    message: 'Not extended (RFC 2774)',
  },
  {
    code: 511,
    name: 'Network Authentication Required',
    enum: 'NETWORK_AUTHENTICATION_REQUIRED',
    message: 'Network authentication required (RFC 6585)',
  },
] as const

/**
 * HTTP Status Codes by name
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
export const HttpStatus = transform(HTTP_STATUS_DICTIONARY, 'enum', 'code')

/**
 * HTTP Status Names
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
export const HttpStatusNames = transform(HTTP_STATUS_DICTIONARY, 'enum', 'name')

/**
 * HTTP Status Messages
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
export const HttpStatusMessages = transform(HTTP_STATUS_DICTIONARY, 'enum', 'message')

/**
 * HTTP Status Codes by number
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
export const HttpStatusCodes = transform(HTTP_STATUS_DICTIONARY, 'code', 'enum')
