export default class {
    public static deepCopy(obj: any): any {
        return JSON.parse(JSON.stringify(obj))
    }
}