import { v4 as uuidv4 } from 'uuid';
import ConfigFair from './model/configFair';
 
class ConfigFairFactory {

    public static createConfigFairFromData(data: {
        fair: string,
    }): ConfigFair {
        return new ConfigFair(uuidv4(), data.fair);
    }

    public static createConfigFair(data: {
        uuid: string,
        fair: string,
    }): ConfigFair {
        return new ConfigFair(data.uuid, data.fair);
    }

    public static configFairToJson(configFair: ConfigFair) {
        return {
            uuid: configFair.getUuid(),
            fair: configFair.getFair()
        }
    }

}

export default ConfigFairFactory;