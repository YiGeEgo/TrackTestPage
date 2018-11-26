export default class Tracker {
    constructor(trackingId) {
        this.fields = {
                trackingId
            },
            this._sendHit = sendHit;
        this._getTime = getTime;
    }
    send(hitType, ...fieldsObject) {
        const params = {
            hitType,
            ...argumentsToFields(hitType, fieldsObject),
            ...this.fields
        }
        const qs = buildUrl(this.fields.trackingId, params);
        this._sendHit(API_BASE_URL, qs);
    }
    get(fieldName) {
        return this.fields[fieldName];
    }
    set(fieldName, fieldValue) {
        this.fields[fieldName] = fieldValue
    }
}

function getTime() {
    return new Date().getTime();
}

function argumentsToFields(hitType, args = []) {
    if (args.length === 1 && args[0].constructor === Object) {
        return args[0];
    } else {
        switch (hitType) {
            case 'pageview':
                {
                    const [page] = args;
                    return {
                        page
                    };
                }
            case 'event':
                {
                    const [eventCategory, eventAction, eventLabel, eventValue] = args;
                    return {
                        eventCategory,
                        eventAction,
                        eventLabel,
                        eventValue
                    };
                }
            case 'social':
                {
                    const [socialNetwork, socialAction, socialTarget] = args;
                    return {
                        socialNetwork,
                        socialAction,
                        socialTarget
                    };
                }
            case 'timing':
                {
                    const [timingCategory, timingVar, timingValue, timingLabel] = args;
                    return {
                        timingCategory,
                        timingVar,
                        timingValue,
                        timingLabel
                    };
                }
            default:
                return {}
        }
    }
}
