class SuplerForm {
    private i18n: I18n;
    private renderOptions: RenderOptions;
    private validatorFnFactories: any;
    private validation: Validation;
    private validatorRenderOptions: ValidatorRenderOptions;

    constructor(private container: HTMLElement, customOptions: any) {
        // TODO: we shouldn't copy everything everywhere

        this.i18n = new I18n();
        Util.copyProperties(this.i18n, customOptions);

        this.renderOptions = new DefaultRenderOptions();
        Util.copyProperties(this.renderOptions, customOptions);

        this.validatorFnFactories = new DefaultValidatorFnFactories(this.i18n);
        Util.copyProperties(this.validatorFnFactories, customOptions);

        this.validatorRenderOptions = new ValidatorRenderOptions;
        Util.copyProperties(this.validatorRenderOptions, customOptions);
    }

    /**
     * @returns False if there were validation errors.
     */
    render(json) {
        var result = new CreateFormFromJson(this.renderOptions, this.i18n, this.validatorFnFactories).renderForm(json.main_form);
        this.container.innerHTML = result.html;
        this.validation = new Validation(this.container, result.validatorDictionary,
            this.validatorRenderOptions, this.i18n);

        return this.validation.processServer(json.errors)
    }

    getValue() {
        return ReadFormValues.getValueFrom(this.container);
    }

    /**
     * @returns True if there were validation errors.
     */
    validate(): boolean {
        return this.validation.processClient();
    }
}
