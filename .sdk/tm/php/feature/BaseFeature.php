<?php
declare(strict_types=1);

// KeanuWhoa SDK base feature

class KeanuWhoaBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(KeanuWhoaContext $ctx, array $options): void {}
    public function PostConstruct(KeanuWhoaContext $ctx): void {}
    public function PostConstructEntity(KeanuWhoaContext $ctx): void {}
    public function SetData(KeanuWhoaContext $ctx): void {}
    public function GetData(KeanuWhoaContext $ctx): void {}
    public function GetMatch(KeanuWhoaContext $ctx): void {}
    public function SetMatch(KeanuWhoaContext $ctx): void {}
    public function PrePoint(KeanuWhoaContext $ctx): void {}
    public function PreSpec(KeanuWhoaContext $ctx): void {}
    public function PreRequest(KeanuWhoaContext $ctx): void {}
    public function PreResponse(KeanuWhoaContext $ctx): void {}
    public function PreResult(KeanuWhoaContext $ctx): void {}
    public function PreDone(KeanuWhoaContext $ctx): void {}
    public function PreUnexpected(KeanuWhoaContext $ctx): void {}
}
