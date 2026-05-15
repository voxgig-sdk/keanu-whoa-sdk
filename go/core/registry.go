package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewWhoaEntityFunc func(client *KeanuWhoaSDK, entopts map[string]any) KeanuWhoaEntity

