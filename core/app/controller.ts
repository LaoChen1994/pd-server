import App from '../base'

interface CProps {
    app: App
}

export default class CoreController {
    app: App
    constructor(props: CProps) {
        this.app = props.app
    }
}