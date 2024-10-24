import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { UnicueText } from '../wrappers/UnicueText';
import '@ton/test-utils';

describe('UnicueText', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let unicueText: SandboxContract<UnicueText>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        unicueText = blockchain.openContract(await UnicueText.fromInit(BigInt(Math.floor(Math.random() * 10000))));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await unicueText.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: unicueText.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and unicueText are ready to use
    });

    it('should increase counter', async () => {

        const counterBefore = await unicueText.getNextItemIndex();

        console.log('counter before increasing', counterBefore); 

        const increaseResult = await unicueText.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'AddText',
                vector: 100n,
                text_value: "fhgjkdhgjdfhgjhdfjkghdfghdfjkghjkdfhgjkdfhgjkdfhgdfgjkdfhgjkdfhgjkdfhgjkdhfgjkhdjkfghdjkvbnmbbnmxcvmsjfhslcvbnjlshfjsbcjkvbruowbfgsjbvwoghlsfhbngjlhwioghlsfvbnjbrsioghsklgnvslmnvwirophglksnvbwsoirhgslfvbnoesrihgs,mfbgwruoghbs,gvwuoerhgbsk.dfgjvopas;ergjnsk.dfnhbosr[utghkldfgbhdiops;tyheifhvnldfngeorighelfgbnortieyhefvbepiuw;hsgb;eorshiutgdfkbveor;iutyrikghnvdrigleuprotyuerpotuerutyperutoperuitoeritoeritoperitoperitoeritopierti5e"
            }
        );

        const counterAfter = await unicueText.getNextItemIndex();

        const increaseResultt = await unicueText.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'AddText',
                vector: 120n,
                text_value: "fksdjfksdjfjsdkfjsdfjsdlfjsdklfj"
            }
        );

        const increaseResulttt = await unicueText.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'AddText',
                vector: 150n,
                text_value: "goihopfighopifhojighopjiopghijopihjopghjiopghijogpjoipghojipoghij"
            }
        );

        console.log('counter after increasing', counterAfter); 


        const text = await unicueText.getAllText();
        console.log(text)

        expect(counterBefore).toBeLessThan(counterAfter);

    });
});
