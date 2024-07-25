import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import MyContract from "./MyContract";

class HubContext {
    private static instance?: HubContext;

    constructor(private connection: HubConnection) {}

    public async close(): Promise<void> {
        await this.connection.stop();
    }

    public async myHubMethod1(): Promise<void> {
        await this.connection.send("myHubMethod1");
    }

    public async myHubMethod2(message: string): Promise<void> {
        await this.connection.send("myHubMethod2", message);
    }

    public static async get(
        onMyClientMethod1: (message: string) => void,
        onMyClientMethod2: (myContract: MyContract) => void,
    ): Promise<HubContext> {
        if (!HubContext.instance) {
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:7030/myHubPattern")
                .withAutomaticReconnect()
                .build();
            
            connection.on("myClientMethod1", onMyClientMethod1);
            connection.on("myClientMethod2", onMyClientMethod2);
            await connection.start();

            HubContext.instance = new HubContext(connection);
        }

        return HubContext.instance;
    }
}

export default HubContext;