import { toNano } from '@ton/core';
import { UnicueText } from '../wrappers/UnicueText';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const unicueText = provider.open(await UnicueText.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await unicueText.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(unicueText.address);

    console.log('ID', await unicueText.getId());
}
