import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values: string[] | number[]): this;
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url: string, variables?: {}): void;
    /**
     * Discover the magic of seamless background removal with our removebg service, powered by
     * cutting-edge AI technology. Our sophisticated algorithm effortlessly identifies and
     * isolates the foreground,  ensuring every detail from the delicate intricacies of jewelry
     * to the finest strands of hair is captured with unparalleled precision.  Designed to
     * excel across a vast array of use cases, our service guarantees immaculate cutouts,
     * whether for professional product photos, dynamic campaign graphics, or personal images
     * meant for creative exploration.  Experience flawless edges and exceptional detail
     * preservation every time, elevating your images beyond the ordinary.
     *
     * **Limitations:**
     *
     *   The recommended composition of an Image, in order to be optimally processed using the
     * "removebg" service, is:
     *   * less busy background
     *   * high contrast (background/foreground)
     *   * background/foreground is distinguishable by naked eye
     *
     *
     *   The foreground should be visually clear, high contrast with relatively sharp edges.
     * The foreground should also be comparably big in the photo. Supported source image
     * formats are JPG, PNG, TIFF, WEBP, and MPO.
     *
     * **Examples:**
     *
     *   Examples of where the remove background service can be utilized include the following:
     *   * Animals
     *   * Products
     *   * Apparel
     *   * Person
     *   * Cars
     *   * Furniture
     *
     * **Options:**
     *   * You have two options for removing the background, either "cutout" or "mask"
     *   * You can control background color
     *   * You can control background blur
     *   * You can control background height and width
     *   * You have two scaling options, either "fit" or "fill"
     *
     * **Source Image:**
     *
     *    If you plan to remove the background several times using different parameters from
     * the list below, we recommend you first upload the source image using the *Upload* method
     * and then use the reference image ID. Otherwise, you can source the image by providing a
     * file or a URL to an online image.
     *
     * **Authorization:**
     *
     *    Start transforming your images today! Just remember, accessing our powerful API
     * requires an API key.
     *    Make sure it's included in your request header **X-Picsart-API-Key** for smooth
     * authorization.
     *    This key unlocks the full potential of our remove background service,
     *    ensuring you can seamlessly integrate these capabilities into your own platform.
     *
     * Discover the possibilities with Picsart and transform the way you work with images.
     * Whether it's for a product for sale, graphical materials for your best campaign, or just
     * personal images for fun editing, you'll get clear edges with awesome detail preservation
     * with our remove background service.
     *
     *
     * @summary Remove & Change Background
     * @throws FetchError<400, types.PostRemovebgResponse400> Bad Request
     * @throws FetchError<401, types.PostRemovebgResponse401> Unauthorized
     * @throws FetchError<402, types.PostRemovebgResponse402> Payment Required
     * @throws FetchError<403, types.PostRemovebgResponse403> Forbidden
     * @throws FetchError<404, types.PostRemovebgResponse404> Not Found
     * @throws FetchError<405, types.PostRemovebgResponse405> Method Not Allowed
     * @throws FetchError<413, types.PostRemovebgResponse413> Request Entity Too Large
     * @throws FetchError<415, types.PostRemovebgResponse415> Unsupported Media Type
     * @throws FetchError<429, types.PostRemovebgResponse429> Too Many Requests
     * @throws FetchError<431, types.PostRemovebgResponse431> Request Header Fields Too Large
     * @throws FetchError<500, types.PostRemovebgResponse500> Internal Server Error
     * @throws FetchError<503, types.PostRemovebgResponse503> Service Unavailable
     */
    postRemovebg(body?: types.PostRemovebgBodyParam): Promise<FetchResponse<200, types.PostRemovebgResponse200>>;
    /**
     * **Service Description:**
     *
     *   The *upscale* service increases the resolutions of an image by a given upscale factor,
     * without increasing its file size. Upscale increases the quality and resolution of your
     * photos by leveraging predictive and generative AI to add pixels to your image. It works
     * especially well on images without noise.
     *
     * **Limitations:**
     *
     *   Images can be upscaled up to 8 times. Images can be upscaled with outputs up to
     * 4800x4800 (16 Mpx). Supported source image formats are JPG, PNG, TIFF and WEBP.
     *
     * **Minimums/Maximums:**
     *    Upscale Factor    | Input Image Maximum Recommended Resolution (width x height)
     *    ------------------| ----------------------------------------
     *    2                 | 2000x2000
     *    4                 | 1024x1024
     *    6                 | 800x800
     *    8                 | 600x600
     *
     * **Examples:**
     *
     *   Examples of where the upscale service can be utilized include the following:
     *   * High resolution images
     *
     *
     * **Rules:**
     *
     *   The image should have sharp details.
     *
     * **Source Image:**
     *
     *   If you plan to upscale an image several times, we recommend you first upload the
     * source image using the *Upload* method and then use the reference image ID. Otherwise,
     * you can source the image by providing a file or a URL to an online image.
     *
     * **Authorization:**
     *
     *   Requires an API key to be provided in the **X-Picsart-API-Key** request header.
     *
     *
     * @summary Upscale
     * @throws FetchError<400, types.PostUpscaleResponse400> Bad Request
     * @throws FetchError<401, types.PostUpscaleResponse401> Unauthorized
     * @throws FetchError<402, types.PostUpscaleResponse402> Payment Required
     * @throws FetchError<403, types.PostUpscaleResponse403> Forbidden
     * @throws FetchError<404, types.PostUpscaleResponse404> Not Found
     * @throws FetchError<405, types.PostUpscaleResponse405> Method Not Allowed
     * @throws FetchError<413, types.PostUpscaleResponse413> Request Entity Too Large
     * @throws FetchError<415, types.PostUpscaleResponse415> Unsupported Media Type
     * @throws FetchError<429, types.PostUpscaleResponse429> Too Many Requests
     * @throws FetchError<431, types.PostUpscaleResponse431> Request Header Fields Too Large
     * @throws FetchError<500, types.PostUpscaleResponse500> Internal Server Error
     * @throws FetchError<503, types.PostUpscaleResponse503> Service Unavailable
     */
    postUpscale(body: types.PostUpscaleBodyParam): Promise<FetchResponse<200, types.PostUpscaleResponse200>>;
    /**
     * **Service Description:** *Upscale Ultra* is a new upscaling technique which does
     * upscaling with noise suppression. It works well on images with faces, small resolution
     * images, stickers and objects with geometric shapes and clear edges. Upscale ultra
     * increases the quality and resolution of low quality photos by leveraging predictive and
     * generative AI technology in order to "complete" missing pixels for a best in class
     * smoothing and enhancement effect. It works especially good on small resolution images
     * with faces.
     *
     * **Limitations:**
     *   Images can be upscaled up to 16 times. Supported source image formats are JPG, PNG,
     * TIFF and WEBP.
     *
     * **Minimums/Maximums:**
     *   * Up to 4Mpx (2048x2048) input images
     *   * Up to 64Mpx output images
     *
     * **Examples:**
     *   Examples of where the upscale ultra service can be utilized include the following:
     *    * Low resolution images
     *    * Images that need smoothing
     *
     * **Options:**
     *   This service allows users to choose from *synchronous*, *asynchronous* and *auto-mode*
     * type of processing. The asynchronous service is preferred when processing large final
     * size image files or when using high upscaling factors. When done asynchronously, rather
     * than receiving a URL to the finished image, you will receive a transaction_id to use
     * with the GET method to retrieve the transformed image. Options are detailed below:
     *   * **Sync**: issues a synchronous request, response is given when the result is ready.
     * In case of processes which take too long (>55 seconds), the request returns an error
     * after timeout. Based on the estimated (calculated by the algorithm) final size of an
     * image, there is also an auto-switching mechanism which automatically switches the
     * processing mode to the async mode, if the estimated final size of the respective image
     * is larger than 4Mpx.
     *   * **Async**: forces an asynchronous request, and the response, which is instantaneous,
     * contains a "transaction_id" which is used to poll for the result. For async processing,
     * the request runs in async mode either until it returns a result or stops after 24 hours.
     *   * **Auto**: the processing mode decision is made automatically by the service,
     * depending upon image size (estimated final size of an image should exceed 4Mpx to choose
     * async automatically).
     *
     *   **Source Image:**
     *     If you plan to upscale ultra an image several times, we recommend you first upload
     * the source image using the *Upload* method and then use the reference image ID.
     * Otherwise, you can source the image by providing a file or a URL to an online image.
     *
     *   **Authorization:**
     *     Requires an API key to be provided in the **X-Picsart-API-Key** request header.
     *
     *
     * @summary Upscale Ultra
     * @throws FetchError<400, types.PostUpscaleUltraResponse400> Bad Request
     * @throws FetchError<401, types.PostUpscaleUltraResponse401> Unauthorized
     * @throws FetchError<402, types.PostUpscaleUltraResponse402> Payment Required
     * @throws FetchError<403, types.PostUpscaleUltraResponse403> Forbidden
     * @throws FetchError<404, types.PostUpscaleUltraResponse404> Not Found
     * @throws FetchError<405, types.PostUpscaleUltraResponse405> Method Not Allowed
     * @throws FetchError<413, types.PostUpscaleUltraResponse413> Request Entity Too Large
     * @throws FetchError<415, types.PostUpscaleUltraResponse415> Unsupported Media Type
     * @throws FetchError<429, types.PostUpscaleUltraResponse429> Too Many Requests
     * @throws FetchError<431, types.PostUpscaleUltraResponse431> Request Header Fields Too Large
     * @throws FetchError<500, types.PostUpscaleUltraResponse500> Internal Server Error
     * @throws FetchError<503, types.PostUpscaleUltraResponse503> Service Unavailable
     */
    postUpscaleUltra(body?: types.PostUpscaleUltraBodyParam): Promise<FetchResponse<200, types.PostUpscaleUltraResponse200> | FetchResponse<202, types.PostUpscaleUltraResponse202>>;
    /**
     * **Service Description:** Use this method, along with transaction_id, to retrieve the
     * upscale ultra finished image if the transformation was done asynchronously.
     * **Authorization:**
     *     Requires an API key to be provided in the **X-Picsart-API-Key** request header.
     *
     *
     * @throws FetchError<400, types.GetUpscaleUltraTransactionIdResponse400> Bad Request
     * @throws FetchError<401, types.GetUpscaleUltraTransactionIdResponse401> Unauthorized
     * @throws FetchError<402, types.GetUpscaleUltraTransactionIdResponse402> Payment Required
     * @throws FetchError<403, types.GetUpscaleUltraTransactionIdResponse403> Forbidden
     * @throws FetchError<404, types.GetUpscaleUltraTransactionIdResponse404> Not Found
     * @throws FetchError<405, types.GetUpscaleUltraTransactionIdResponse405> Method Not Allowed
     * @throws FetchError<413, types.GetUpscaleUltraTransactionIdResponse413> Request Entity Too Large
     * @throws FetchError<415, types.GetUpscaleUltraTransactionIdResponse415> Unsupported Media Type
     * @throws FetchError<429, types.GetUpscaleUltraTransactionIdResponse429> Too Many Requests
     * @throws FetchError<431, types.GetUpscaleUltraTransactionIdResponse431> Request Header Fields Too Large
     * @throws FetchError<500, types.GetUpscaleUltraTransactionIdResponse500> Internal Server Error
     * @throws FetchError<503, types.GetUpscaleUltraTransactionIdResponse503> Service Unavailable
     */
    getUpscaleUltraTransaction_id(metadata: types.GetUpscaleUltraTransactionIdMetadataParam): Promise<FetchResponse<200, types.GetUpscaleUltraTransactionIdResponse200> | FetchResponse<202, types.GetUpscaleUltraTransactionIdResponse202>>;
    /**
     * **Service Description:**
     *   *Ultra enhance* is a new upscaling technique with a generative model which provides
     * high frequency detail. It works well on images without noise and preserves details in a
     * superior way.
     *
     *  **Limitations:** Up to 16 times upscaling on input images. Supported source image
     * formats are JPG, PNG, TIFF and WEBP.
     *
     *  **Minimums/Maximums:**
     *    * Up to 64Mpx output images
     *
     *  **Examples:**
     *    Examples of where ultra enhance can be utilized include the following:
     *    * Low resolution images
     *    * Images that need smoothing and realistic details
     *    * To de-noise an image
     *    * Works best with the Face Enhance service
     *
     *  **Source Image:**
     *    If you plan to upscale enhance an image several times, we recommend you first upload
     * the source image using the *Upload* method and then use the reference image ID.
     * Otherwise, you can source the image by providing a file or a URL to an online image.
     *
     *  **Authorization:**
     *      Requires an API key to be provided in the **X-Picsart-API-Key** request header.
     *
     *
     * @summary Ultra Enhance
     * @throws FetchError<400, types.PostUpscaleEnhanceResponse400> Bad Request
     * @throws FetchError<401, types.PostUpscaleEnhanceResponse401> Unauthorized
     * @throws FetchError<402, types.PostUpscaleEnhanceResponse402> Payment Required
     * @throws FetchError<403, types.PostUpscaleEnhanceResponse403> Forbidden
     * @throws FetchError<404, types.PostUpscaleEnhanceResponse404> Not Found
     * @throws FetchError<405, types.PostUpscaleEnhanceResponse405> Method Not Allowed
     * @throws FetchError<413, types.PostUpscaleEnhanceResponse413> Request Entity Too Large
     * @throws FetchError<415, types.PostUpscaleEnhanceResponse415> Unsupported Media Type
     * @throws FetchError<429, types.PostUpscaleEnhanceResponse429> Too Many Requests
     * @throws FetchError<431, types.PostUpscaleEnhanceResponse431> Request Header Fields Too Large
     * @throws FetchError<500, types.PostUpscaleEnhanceResponse500> Internal Server Error
     * @throws FetchError<503, types.PostUpscaleEnhanceResponse503> Service Unavailable
     */
    postUpscaleEnhance(body?: types.PostUpscaleEnhanceBodyParam): Promise<FetchResponse<200, types.PostUpscaleEnhanceResponse200>>;
    /**
     * **Service Description:**
     *   With our *enhance face* tool, you can turn your old, blurry photos into clear
     * portraits and selfies.
     *   Our AI technology will find faces, perform restoration and do color enhancement
     * simultaneously.
     *   It will improve the skin texture and sharpen details while keeping a good balance of
     * realness and fidelity with much less artifacts.
     *
     *  **Limitations:** Supported image formats are JPG, PNG, TIFF and WEBP.
     *
     *  **Examples:**
     *    Examples of where the face enhancement tool can be utilized include the following:
     *    * Selfies
     *    * Face macros (close up)
     *    * Images with multiple faces
     *    * Images with mid-range faces
     *    * Results of professional photo shoots
     *
     *  **Source Image:**
     *    If you plan to apply a mask to an image multiple times, we recommend you first upload
     * the source image using the *Upload* method and then use the reference image ID.
     * Otherwise, you can source the image by providing a file or a URL to an online image.
     *
     *  **Authorization:**
     *      Requires an API key to be provided in the **X-Picsart-API-Key** request header.
     *
     *
     * @summary Face Enhancement
     * @throws FetchError<400, types.PostEnhanceFaceResponse400> Bad Request
     * @throws FetchError<401, types.PostEnhanceFaceResponse401> Unauthorized
     * @throws FetchError<402, types.PostEnhanceFaceResponse402> Payment Required
     * @throws FetchError<403, types.PostEnhanceFaceResponse403> Forbidden
     * @throws FetchError<404, types.PostEnhanceFaceResponse404> Not Found
     * @throws FetchError<405, types.PostEnhanceFaceResponse405> Method Not Allowed
     * @throws FetchError<413, types.PostEnhanceFaceResponse413> Request Entity Too Large
     * @throws FetchError<415, types.PostEnhanceFaceResponse415> Unsupported Media Type
     * @throws FetchError<429, types.PostEnhanceFaceResponse429> Too Many Requests
     * @throws FetchError<431, types.PostEnhanceFaceResponse431> Request Header Fields Too Large
     * @throws FetchError<500, types.PostEnhanceFaceResponse500> Internal Server Error
     * @throws FetchError<503, types.PostEnhanceFaceResponse503> Service Unavailable
     */
    postEnhanceFace(body?: types.PostEnhanceFaceBodyParam): Promise<FetchResponse<200, types.PostEnhanceFaceResponse200>>;
    /**
     * **Service Description:**
     *   This service retrieves a list of supported effects.
     *
     * **Authorization:**
     *     Requires an API key to be provided in the **X-Picsart-API-Key** request header.
     *
     *
     * @summary Effects
     * @throws FetchError<400, types.GetEffectsResponse400> Bad Request
     * @throws FetchError<401, types.GetEffectsResponse401> Unauthorized
     * @throws FetchError<402, types.GetEffectsResponse402> Payment Required
     * @throws FetchError<403, types.GetEffectsResponse403> Forbidden
     * @throws FetchError<404, types.GetEffectsResponse404> Not Found
     * @throws FetchError<405, types.GetEffectsResponse405> Method Not Allowed
     * @throws FetchError<413, types.GetEffectsResponse413> Request Entity Too Large
     * @throws FetchError<415, types.GetEffectsResponse415> Unsupported Media Type
     * @throws FetchError<429, types.GetEffectsResponse429> Too Many Requests
     * @throws FetchError<431, types.GetEffectsResponse431> Request Header Fields Too Large
     * @throws FetchError<500, types.GetEffectsResponse500> Internal Server Error
     * @throws FetchError<503, types.GetEffectsResponse503> Service Unavailable
     */
    getEffects(): Promise<FetchResponse<200, types.GetEffectsResponse200>>;
    /**
     * **Service Description:**
     *   With the *effects* service you can apply up to 24 different effects to an image.
     *
     * **Limitations:** Works best with color-rich photos. Supported source image formats are
     * JPG, PNG, TIFF and WEBP.
     *
     * **Examples:**
     *   Examples of where effects can be used include the following:
     *   * Works with all photo types
     *   * Makes any photo stand out
     *   * Helps with branding
     *   * Great with look up tables (LUT)
     *
     * **Options:** Choose the effect to apply
     *
     * **Source Image:**
     *   If you plan to apply effects to an image several times, we recommend you first upload
     * the source image using the *Upload* method and then use the reference image ID.
     * Otherwise, you can source the image by providing a file or a URL to an online image.
     *
     * **Authorization:**
     *     Requires an API key to be provided in the **X-Picsart-API-Key** request header.
     *
     *
     * @throws FetchError<400, types.PostEffectsResponse400> Bad Request
     * @throws FetchError<401, types.PostEffectsResponse401> Unauthorized
     * @throws FetchError<402, types.PostEffectsResponse402> Payment Required
     * @throws FetchError<403, types.PostEffectsResponse403> Forbidden
     * @throws FetchError<404, types.PostEffectsResponse404> Not Found
     * @throws FetchError<405, types.PostEffectsResponse405> Method Not Allowed
     * @throws FetchError<413, types.PostEffectsResponse413> Request Entity Too Large
     * @throws FetchError<415, types.PostEffectsResponse415> Unsupported Media Type
     * @throws FetchError<429, types.PostEffectsResponse429> Too Many Requests
     * @throws FetchError<431, types.PostEffectsResponse431> Request Header Fields Too Large
     * @throws FetchError<500, types.PostEffectsResponse500> Internal Server Error
     * @throws FetchError<503, types.PostEffectsResponse503> Service Unavailable
     */
    postEffects(body: types.PostEffectsBodyParam): Promise<FetchResponse<200, types.PostEffectsResponse200>>;
    /**
     * **Service Description:**
     *   The *effects previews* service applies an effect to a given input image and returns a
     * preview (i.e., thumbnail) of the effect.
     *
     * **Limitations:** Can apply up to 10 effects to an image in one call. To minimize the
     * networking and processing loads, use the same input image size as the desired preview
     * size. Supported source image formats are JPG, PNG, TIFF and WEBP.
     *
     * **Minimums/Maximums:**
     *   * Maximum height or width of preview image is 240px
     *
     * **Options:**
     *   * You can set the size of the preview image
     *   * There are 24 different effects to choose from
     *
     * **Authorization:**
     *     Requires an API key to be provided in the **X-Picsart-API-Key** request header.
     *
     *
     * @summary Effect Previews
     * @throws FetchError<400, types.PostEffectsPreviewsResponse400> Bad Request
     * @throws FetchError<401, types.PostEffectsPreviewsResponse401> Unauthorized
     * @throws FetchError<402, types.PostEffectsPreviewsResponse402> Payment Required
     * @throws FetchError<403, types.PostEffectsPreviewsResponse403> Forbidden
     * @throws FetchError<404, types.PostEffectsPreviewsResponse404> Not Found
     * @throws FetchError<405, types.PostEffectsPreviewsResponse405> Method Not Allowed
     * @throws FetchError<413, types.PostEffectsPreviewsResponse413> Request Entity Too Large
     * @throws FetchError<415, types.PostEffectsPreviewsResponse415> Unsupported Media Type
     * @throws FetchError<429, types.PostEffectsPreviewsResponse429> Too Many Requests
     * @throws FetchError<431, types.PostEffectsPreviewsResponse431> Request Header Fields Too Large
     * @throws FetchError<500, types.PostEffectsPreviewsResponse500> Internal Server Error
     * @throws FetchError<503, types.PostEffectsPreviewsResponse503> Service Unavailable
     */
    postEffectsPreviews(body: types.PostEffectsPreviewsBodyParam): Promise<FetchResponse<200, types.PostEffectsPreviewsResponse200>>;
    /**
     * **Service Description:**
     *   The *adjust* service applies adjustments to an input image. There are 11 different
     * adjustments in all available. The adjust service can be used with all photo types.
     *
     * **Limitations:** Supported source image formats are JPG, PNG, TIFF and WEBP.
     *
     * **Options:** Adjustment options include the following:
     *   * Adjust brightness and/or contrast
     *   * Adjust clarity and/or saturation
     *   * Adjust hue and/or shadows
     *   * Adjust highlights and/or temperature
     *   * Adjust noise or sharpen the image
     *
     * **Rules:**
     *   * At least one adjustment setting must be chosen
     *   * If you choose an adjustment setting value out of the allowed range, the default
     * value of 0 is used instead.
     *
     * **Source Image:**
     *   If you plan to apply adjustments multiple times to an image, we recommend you first
     * upload the source image using the *Upload* method and then use the reference image ID.
     * Otherwise, you can source the image by providing a file or a URL to an online image.
     *
     * **Authorization:**
     *     Requires an API key to be provided in the **X-Picsart-API-Key** request header.
     *
     *
     * @summary Adjust
     * @throws FetchError<400, types.PostAdjustResponse400> Bad Request
     * @throws FetchError<401, types.PostAdjustResponse401> Unauthorized
     * @throws FetchError<402, types.PostAdjustResponse402> Payment Required
     * @throws FetchError<403, types.PostAdjustResponse403> Forbidden
     * @throws FetchError<404, types.PostAdjustResponse404> Not Found
     * @throws FetchError<405, types.PostAdjustResponse405> Method Not Allowed
     * @throws FetchError<413, types.PostAdjustResponse413> Request Entity Too Large
     * @throws FetchError<415, types.PostAdjustResponse415> Unsupported Media Type
     * @throws FetchError<429, types.PostAdjustResponse429> Too Many Requests
     * @throws FetchError<431, types.PostAdjustResponse431> Request Header Fields Too Large
     * @throws FetchError<500, types.PostAdjustResponse500> Internal Server Error
     * @throws FetchError<503, types.PostAdjustResponse503> Service Unavailable
     */
    postAdjust(body?: types.PostAdjustBodyParam): Promise<FetchResponse<200, types.PostAdjustResponse200>>;
    /**
     * **Service Description:**
     *   The *style transfer* tool transfers a style from a reference image to a content image.
     * The smart algorithm blends the two images together so the output looks like the content
     * image, but "painted" in the style of the reference image.
     *
     * **Limitations:** Works best with graphics reference images. Works best with nature
     * content images. Supported source image formats are JPG, PNG, TIFF and WEBP.
     * **Examples:**
     *   Examples of where the style transfer tool can be used include the following:
     *   * Magic filters
     *   * To convert an image to a piece of art
     *   * To generate unique results
     *   * To recreate the style of a famous painting
     *
     * **Options:**
     *   * You can choose from five different levels of transfer
     *
     * **Source Image:**
     *   If you plan to transfer styles to an image multiple times, we recommend you first
     * upload the source image using the *Upload* method and then use the reference image ID.
     * Otherwise, you can source the image by providing a file or a URL to an online image.
     *
     * **Authorization:**
     *     Requires an API key to be provided in the **X-Picsart-API-Key** request header.
     *
     *
     * @summary Style Transfer
     * @throws FetchError<400, types.PostStyletransferResponse400> Bad Request
     * @throws FetchError<401, types.PostStyletransferResponse401> Unauthorized
     * @throws FetchError<402, types.PostStyletransferResponse402> Payment Required
     * @throws FetchError<403, types.PostStyletransferResponse403> Forbidden
     * @throws FetchError<404, types.PostStyletransferResponse404> Not Found
     * @throws FetchError<405, types.PostStyletransferResponse405> Method Not Allowed
     * @throws FetchError<413, types.PostStyletransferResponse413> Request Entity Too Large
     * @throws FetchError<415, types.PostStyletransferResponse415> Unsupported Media Type
     * @throws FetchError<429, types.PostStyletransferResponse429> Too Many Requests
     * @throws FetchError<431, types.PostStyletransferResponse431> Request Header Fields Too Large
     * @throws FetchError<500, types.PostStyletransferResponse500> Internal Server Error
     * @throws FetchError<503, types.PostStyletransferResponse503> Service Unavailable
     */
    postStyletransfer(body?: types.PostStyletransferBodyParam): Promise<FetchResponse<200, types.PostStyletransferResponse200>>;
    /**
     * **Service Description:**
     *   The *masks* service applies a mask to an image.
     *
     * **Limitations:** Supported source image formats are JPG, PNG, TIFF and WEBP.
     *
     * **Options:** Each mask application offers five options:
     *  * Blend: determines the appearance of the mask (7 choices)
     *  * Mask type: determines the mask type (11 choices)
     *  * Opacity: determines the opaqueness of the mask (0 to 100)
     *  * Hue: determines the hue of the mask (-180 to 180)
     *  * Mask flip: gives options to flip the mask (5 choices)
     *
     * **Source Image:**
     *   If you plan to apply a mask to an image multiple times, we recommend you first upload
     * the source image using the *Upload* method and then use the reference image ID.
     * Otherwise, you can source the image by providing a file or a URL to an online image.
     *
     * **Authorization:**
     *     Requires an API key to be provided in the **X-Picsart-API-Key** request header.
     *
     *
     * @throws FetchError<400, types.PostMasksResponse400> Bad Request
     * @throws FetchError<401, types.PostMasksResponse401> Unauthorized
     * @throws FetchError<402, types.PostMasksResponse402> Payment Required
     * @throws FetchError<403, types.PostMasksResponse403> Forbidden
     * @throws FetchError<404, types.PostMasksResponse404> Not Found
     * @throws FetchError<405, types.PostMasksResponse405> Method Not Allowed
     * @throws FetchError<413, types.PostMasksResponse413> Request Entity Too Large
     * @throws FetchError<415, types.PostMasksResponse415> Unsupported Media Type
     * @throws FetchError<429, types.PostMasksResponse429> Too Many Requests
     * @throws FetchError<431, types.PostMasksResponse431> Request Header Fields Too Large
     * @throws FetchError<500, types.PostMasksResponse500> Internal Server Error
     * @throws FetchError<503, types.PostMasksResponse503> Service Unavailable
     */
    postMasks(body: types.PostMasksBodyParam): Promise<FetchResponse<200, types.PostMasksResponse200>>;
    /**
     * **Description:**
     *   The *masks previews* service applies mask effects to a given input image and returns a
     * preview (i.e., thumbnail) of the effect.
     *
     * **Limitations:** To minimize the networking and processing loads, use the same input
     * image size as the desired preview size. Supported source image formats are JPG, PNG,
     * TIFF and WEBP.
     *
     * **Minimums/Maximums:**
     *   * Maximum height or width of preview image is 240px
     *
     * **Options:**
     *   * You can set the size of the preview image
     *   * You can choose blend which determines the appearance of the mask
     *   * You can choose mask type
     *   * You can set the mask's opacity
     *   * You can set the mask's hue
     *   * You can choose a mask flip
     *
     * **Source Image:**
     *   If you want to preview multiple effects of the same image, we recommend you first
     * upload the source image using the *Upload* method and then use the reference image ID.
     * Otherwise, you can source the image by providing a file or a URL to an online image.
     *
     * **Authorization:**
     *     Requires an API key to be provided in the **X-Picsart-API-Key** request header.
     *
     *
     * @throws FetchError<400, types.PostMasksPreviewsResponse400> Bad Request
     * @throws FetchError<401, types.PostMasksPreviewsResponse401> Unauthorized
     * @throws FetchError<402, types.PostMasksPreviewsResponse402> Payment Required
     * @throws FetchError<403, types.PostMasksPreviewsResponse403> Forbidden
     * @throws FetchError<404, types.PostMasksPreviewsResponse404> Not Found
     * @throws FetchError<405, types.PostMasksPreviewsResponse405> Method Not Allowed
     * @throws FetchError<413, types.PostMasksPreviewsResponse413> Request Entity Too Large
     * @throws FetchError<415, types.PostMasksPreviewsResponse415> Unsupported Media Type
     * @throws FetchError<429, types.PostMasksPreviewsResponse429> Too Many Requests
     * @throws FetchError<431, types.PostMasksPreviewsResponse431> Request Header Fields Too Large
     * @throws FetchError<500, types.PostMasksPreviewsResponse500> Internal Server Error
     * @throws FetchError<503, types.PostMasksPreviewsResponse503> Service Unavailable
     */
    postMasksPreviews(body: types.PostMasksPreviewsBodyParam): Promise<FetchResponse<200, types.PostMasksPreviewsResponse200>>;
    /**
     * **Service Description:**
     *   The *texture generator* tool generates a background texture pattern for the input
     * image. You can create unlimited textures from the same texture source image.
     *
     * **Limitations:** Works best with colorful source images. Supported source image formats
     * are JPG, PNG, TIFF and WEBP.
     *
     * **Examples:**
     *   Examples of where the texture generator tool can be used include the following:
     *   * Backgrounds
     *   * Patterns
     *   * Tiles
     *
     * **Options:**
     *   * You can control width and height of the output image
     *   * You can control the x and y offset, from the center, of the pattern
     *   * You can choose from five different patterns
     *   * You can scale and/or rotate the pattern
     *
     * **Source Image:**
     *   If you want to apply multiple textures to the same image, we recommend you first
     * upload the source image using the *Upload* method and then use the reference image ID.
     * Otherwise, you can source the image by providing a file or a URL to an online image.
     *
     * **Authorization:**
     *     Requires an API key to be provided in the **X-Picsart-API-Key** request header.
     *
     *
     * @summary Texture Generator
     * @throws FetchError<400, types.PostBackgroundTextureResponse400> Bad Request
     * @throws FetchError<401, types.PostBackgroundTextureResponse401> Unauthorized
     * @throws FetchError<402, types.PostBackgroundTextureResponse402> Payment Required
     * @throws FetchError<403, types.PostBackgroundTextureResponse403> Forbidden
     * @throws FetchError<404, types.PostBackgroundTextureResponse404> Not Found
     * @throws FetchError<405, types.PostBackgroundTextureResponse405> Method Not Allowed
     * @throws FetchError<413, types.PostBackgroundTextureResponse413> Request Entity Too Large
     * @throws FetchError<415, types.PostBackgroundTextureResponse415> Unsupported Media Type
     * @throws FetchError<422, types.PostBackgroundTextureResponse422> Unprocessable Entity
     * @throws FetchError<429, types.PostBackgroundTextureResponse429> Too Many Requests
     * @throws FetchError<431, types.PostBackgroundTextureResponse431> Request Header Fields Too Large
     * @throws FetchError<500, types.PostBackgroundTextureResponse500> Internal Server Error
     * @throws FetchError<503, types.PostBackgroundTextureResponse503> Service Unavailable
     */
    postBackgroundTexture(body?: types.PostBackgroundTextureBodyParam): Promise<FetchResponse<200, types.PostBackgroundTextureResponse200>>;
    /**
     * **Service Description:**
     *   With the *vectorizer* tool you can instantly turn your raster image into high quality
     * vector graphic as it converts a PNG image to a SVG image.
     *   Using geometric figures, like curves and lines, the vectorizer converts the pixel
     * information of raster input into vector image, which can be enlarged and edited without
     * quality loss.
     *
     * **Limitations:** We recommend keeping files up to 2048 on each side. Supported source
     * image formats are JPG, PNG, TIFF and WEBP. Output is always SVG.
     *
     * **Examples:** Examples of where the vectorizer can be used include:
     *   * Icons
     *   * Logos
     *   * Illustrations
     *   * Graphics
     *   * Shapes
     *
     * **Options:** If the original does not meet the recommended file size, you can downscale
     * with downscale_to parameter.
     *
     * **Minimums/Maximums:**
     *   * Images up to 8K
     *
     * **Source Image:**
     *   You can source the image by providing a file, a URL to an online image, or a
     * reference_id from a previously uploaded image.
     *
     * **Authorization:**
     *     Requires an API key to be provided in the **X-Picsart-API-Key** request header.
     *
     *
     * @summary Image Vectorizer
     * @throws FetchError<400, types.PostVectorizerResponse400> Bad Request
     * @throws FetchError<401, types.PostVectorizerResponse401> Unauthorized
     * @throws FetchError<402, types.PostVectorizerResponse402> Payment Required
     * @throws FetchError<403, types.PostVectorizerResponse403> Forbidden
     * @throws FetchError<404, types.PostVectorizerResponse404> Not Found
     * @throws FetchError<405, types.PostVectorizerResponse405> Method Not Allowed
     * @throws FetchError<413, types.PostVectorizerResponse413> Request Entity Too Large
     * @throws FetchError<415, types.PostVectorizerResponse415> Unsupported Media Type
     * @throws FetchError<429, types.PostVectorizerResponse429> Too Many Requests
     * @throws FetchError<431, types.PostVectorizerResponse431> Request Header Fields Too Large
     * @throws FetchError<500, types.PostVectorizerResponse500> Internal Server Error
     * @throws FetchError<503, types.PostVectorizerResponse503> Service Unavailable
     */
    postVectorizer(body?: types.PostVectorizerBodyParam): Promise<FetchResponse<200, types.PostVectorizerResponse200>>;
    /**
     * **Service Description:**
     *   With the *surface map* tool you can "print" a sticker over an (target) image.
     *   Using a mask, the Surfacemap tool maps the sticker pixels using the texture and curves
     * on the target image
     *   thus ultimately giving a live-print-preview effect.
     *
     * **Limitations:** We recommend following these rules when providing image, mask and
     * sticker
     *   * Image, mask and sticker - providing all three is required,
     *   * The size of the mask and the image should be the same,
     *   * The size of the sticker should match the "masked" area's size or proportions.
     *
     * **Examples:** Examples of where the Surfacemap can be used include:
     *   * T-shirt print preview
     *   * Mug print preview
     *   * Pillow print preview
     *
     * **Source Images:**
     *   You can source the image by providing a file, a URL to an online image, or a
     * reference_id from a previously uploaded image.
     *   This also applies to the mask and the sticker provided at the input
     *
     *
     * **Authorization:**
     *     Requires an API key to be provided in the **X-Picsart-API-Key** request header.
     *
     *
     * @summary Surfacemap Image
     * @throws FetchError<400, types.PostSurfacemapResponse400> Bad Request
     * @throws FetchError<401, types.PostSurfacemapResponse401> Unauthorized
     * @throws FetchError<402, types.PostSurfacemapResponse402> Payment Required
     * @throws FetchError<403, types.PostSurfacemapResponse403> Forbidden
     * @throws FetchError<404, types.PostSurfacemapResponse404> Not Found
     * @throws FetchError<405, types.PostSurfacemapResponse405> Method Not Allowed
     * @throws FetchError<413, types.PostSurfacemapResponse413> Request Entity Too Large
     * @throws FetchError<415, types.PostSurfacemapResponse415> Unsupported Media Type
     * @throws FetchError<429, types.PostSurfacemapResponse429> Too Many Requests
     * @throws FetchError<431, types.PostSurfacemapResponse431> Request Header Fields Too Large
     * @throws FetchError<500, types.PostSurfacemapResponse500> Internal Server Error
     * @throws FetchError<503, types.PostSurfacemapResponse503> Service Unavailable
     */
    postSurfacemap(body?: types.PostSurfacemapBodyParam): Promise<FetchResponse<200, types.PostSurfacemapResponse200>>;
    /**
     * **Service Description**
     *   The *upload* service is used to upload an image when you want to apply several
     * transformations to it.
     *   By uploading an image first, you'll receive a transaction_id which you can use
     * repeatedly for transformations and thereby avoid having to upload an image for each and
     * every one.
     *   If you're sure you only want to do a single transformation to an image, there's no
     * benefit to using this service. Just jump right to that service.
     *
     *  **Limitations:** Supported source image formats are JPG, PNG, TIFF and WEBP.
     *
     *  **Source Image:**
     *    You can source the image by providing a file or a URL to an online image.
     *
     *  **Authorization:**
     *      Requires an API key to be provided in the **X-Picsart-API-Key** request header.
     *
     *
     * @throws FetchError<400, types.PostUploadResponse400> Bad Request
     * @throws FetchError<401, types.PostUploadResponse401> Unauthorized
     * @throws FetchError<402, types.PostUploadResponse402> Payment Required
     * @throws FetchError<403, types.PostUploadResponse403> Forbidden
     * @throws FetchError<404, types.PostUploadResponse404> Not Found
     * @throws FetchError<405, types.PostUploadResponse405> Method Not Allowed
     * @throws FetchError<413, types.PostUploadResponse413> Request Entity Too Large
     * @throws FetchError<415, types.PostUploadResponse415> Unsupported Media Type
     * @throws FetchError<429, types.PostUploadResponse429> Too Many Requests
     * @throws FetchError<431, types.PostUploadResponse431> Request Header Fields Too Large
     * @throws FetchError<500, types.PostUploadResponse500> Internal Server Error
     * @throws FetchError<503, types.PostUploadResponse503> Service Unavailable
     */
    postUpload(body?: types.PostUploadBodyParam): Promise<FetchResponse<200, types.PostUploadResponse200>>;
    /**
     * **Service Description:**
     *   Check your balance of credits.
     *
     * **Authorization:**
     *     Requires an API key to be provided in the **X-Picsart-API-Key** request header.
     *
     *
     * @summary Balance
     * @throws FetchError<400, types.GetBalanceResponse400> Bad Request
     * @throws FetchError<401, types.GetBalanceResponse401> Unauthorized
     * @throws FetchError<402, types.GetBalanceResponse402> Payment Required
     * @throws FetchError<403, types.GetBalanceResponse403> Forbidden
     * @throws FetchError<404, types.GetBalanceResponse404> Not Found
     * @throws FetchError<405, types.GetBalanceResponse405> Method Not Allowed
     * @throws FetchError<413, types.GetBalanceResponse413> Request Entity Too Large
     * @throws FetchError<415, types.GetBalanceResponse415> Unsupported Media Type
     * @throws FetchError<429, types.GetBalanceResponse429> Too Many Requests
     * @throws FetchError<431, types.GetBalanceResponse431> Request Header Fields Too Large
     * @throws FetchError<500, types.GetBalanceResponse500> Internal Server Error
     * @throws FetchError<503, types.GetBalanceResponse503> Service Unavailable
     */
    getBalance(): Promise<FetchResponse<200, types.GetBalanceResponse200>>;
    /**
     * **Service Description:**
     *   The *Edit* service applies basic image editing to an input image.
     *   The basic editing operations are resize, crop, flip, rotate and perspective
     * manipulation.
     *
     *  **Limitations:**
     * Supported image formats are JPG, PNG, TIFF and WEBP. The resultant image cannot be
     * bigger than the original source image. To get greater resolution, see the Upscale
     * services.
     *
     *  **Options:**
     *    * Define the crop dimensions: width and height
     *    * Define the area of the cutout
     *      * If the area is not defined, the cut out will be done with center-crop.
     *    * Rotate the image
     *      * By degrees (+180 to -180)
     *      * The original image, after rotation, may be zoomed to fill in the area
     *    * Flip the image: horizontally or vertically
     *    * Choose the perspective view of the image: horizontal or vertical
     *
     *  **Rules:**
     *    * If you choose an Edit setting value out of the allowed range, the default value of
     * the field will be used instead (see documentation below).
     *
     *  **Source Image:**
     *    If you plan to apply a mask to an image multiple times, we recommend you first upload
     * the source image using the *Upload* method and then use the reference image ID.
     * Otherwise, you can source the image by providing a file or a URL to an online image.
     *
     *  **Authorization:**
     *      Requires an API key to be provided in the **X-Picsart-API-Key** request header.
     *
     *
     * @summary Basic Editing
     * @throws FetchError<400, types.PostEditResponse400> Bad Request
     * @throws FetchError<401, types.PostEditResponse401> Unauthorized
     * @throws FetchError<402, types.PostEditResponse402> Payment Required
     * @throws FetchError<403, types.PostEditResponse403> Forbidden
     * @throws FetchError<404, types.PostEditResponse404> Not Found
     * @throws FetchError<405, types.PostEditResponse405> Method Not Allowed
     * @throws FetchError<413, types.PostEditResponse413> Request Entity Too Large
     * @throws FetchError<415, types.PostEditResponse415> Unsupported Media Type
     * @throws FetchError<429, types.PostEditResponse429> Too Many Requests
     * @throws FetchError<431, types.PostEditResponse431> Request Header Fields Too Large
     * @throws FetchError<500, types.PostEditResponse500> Internal Server Error
     * @throws FetchError<503, types.PostEditResponse503> Service Unavailable
     */
    postEdit(body?: types.PostEditBodyParam): Promise<FetchResponse<200, types.PostEditResponse200>>;
}
declare const createSDK: SDK;
export = createSDK;
