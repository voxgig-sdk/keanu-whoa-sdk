package core

type KeanuWhoaError struct {
	IsKeanuWhoaError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewKeanuWhoaError(code string, msg string, ctx *Context) *KeanuWhoaError {
	return &KeanuWhoaError{
		IsKeanuWhoaError: true,
		Sdk:              "KeanuWhoa",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *KeanuWhoaError) Error() string {
	return e.Msg
}
