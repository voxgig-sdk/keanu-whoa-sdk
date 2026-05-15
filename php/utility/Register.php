<?php
declare(strict_types=1);

// KeanuWhoa SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

KeanuWhoaUtility::setRegistrar(function (KeanuWhoaUtility $u): void {
    $u->clean = [KeanuWhoaClean::class, 'call'];
    $u->done = [KeanuWhoaDone::class, 'call'];
    $u->make_error = [KeanuWhoaMakeError::class, 'call'];
    $u->feature_add = [KeanuWhoaFeatureAdd::class, 'call'];
    $u->feature_hook = [KeanuWhoaFeatureHook::class, 'call'];
    $u->feature_init = [KeanuWhoaFeatureInit::class, 'call'];
    $u->fetcher = [KeanuWhoaFetcher::class, 'call'];
    $u->make_fetch_def = [KeanuWhoaMakeFetchDef::class, 'call'];
    $u->make_context = [KeanuWhoaMakeContext::class, 'call'];
    $u->make_options = [KeanuWhoaMakeOptions::class, 'call'];
    $u->make_request = [KeanuWhoaMakeRequest::class, 'call'];
    $u->make_response = [KeanuWhoaMakeResponse::class, 'call'];
    $u->make_result = [KeanuWhoaMakeResult::class, 'call'];
    $u->make_point = [KeanuWhoaMakePoint::class, 'call'];
    $u->make_spec = [KeanuWhoaMakeSpec::class, 'call'];
    $u->make_url = [KeanuWhoaMakeUrl::class, 'call'];
    $u->param = [KeanuWhoaParam::class, 'call'];
    $u->prepare_auth = [KeanuWhoaPrepareAuth::class, 'call'];
    $u->prepare_body = [KeanuWhoaPrepareBody::class, 'call'];
    $u->prepare_headers = [KeanuWhoaPrepareHeaders::class, 'call'];
    $u->prepare_method = [KeanuWhoaPrepareMethod::class, 'call'];
    $u->prepare_params = [KeanuWhoaPrepareParams::class, 'call'];
    $u->prepare_path = [KeanuWhoaPreparePath::class, 'call'];
    $u->prepare_query = [KeanuWhoaPrepareQuery::class, 'call'];
    $u->result_basic = [KeanuWhoaResultBasic::class, 'call'];
    $u->result_body = [KeanuWhoaResultBody::class, 'call'];
    $u->result_headers = [KeanuWhoaResultHeaders::class, 'call'];
    $u->transform_request = [KeanuWhoaTransformRequest::class, 'call'];
    $u->transform_response = [KeanuWhoaTransformResponse::class, 'call'];
});
