package voxgigkeanuwhoasdk

import (
	"github.com/voxgig-sdk/keanu-whoa-sdk/go/core"
	"github.com/voxgig-sdk/keanu-whoa-sdk/go/entity"
	"github.com/voxgig-sdk/keanu-whoa-sdk/go/feature"
	_ "github.com/voxgig-sdk/keanu-whoa-sdk/go/utility"
)

// Type aliases preserve external API.
type KeanuWhoaSDK = core.KeanuWhoaSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type KeanuWhoaEntity = core.KeanuWhoaEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type KeanuWhoaError = core.KeanuWhoaError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewWhoaEntityFunc = func(client *core.KeanuWhoaSDK, entopts map[string]any) core.KeanuWhoaEntity {
		return entity.NewWhoaEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewKeanuWhoaSDK = core.NewKeanuWhoaSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewKeanuWhoaSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *KeanuWhoaSDK  { return NewKeanuWhoaSDK(nil) }
func Test() *KeanuWhoaSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
