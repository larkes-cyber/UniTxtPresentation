import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/unicue_text.tact',
    options: {
        debug: true,
    },
};
