import { execSync } from 'child_process'

const setup = async () => {
  execSync('yarn nx run services-directorate-of-labor:seed/undo --env test')
}

export default setup
