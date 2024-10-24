import { Address, toNano } from '@ton/core';
import { UnicueText } from '../wrappers/UnicueText';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('UnicueText address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const unicueText = provider.open(UnicueText.fromAddress(address));

    await unicueText.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'UpdateText',
            id: 1n,
            vector: 5000n,
            text_value: "Hello, today we are gonna do learning javascript.",
        }
    );

    ui.clearActionPrompt();
    ui.write('Successfully!');
}
