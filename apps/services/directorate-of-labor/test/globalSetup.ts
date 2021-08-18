import { execSync } from 'child_process'

const setup = async () => {
  execSync('yarn nx run services-directorate-of-labor:migrate --env test')
  execSync('yarn nx run services-directorate-of-labor:seed --env test')
}

export default setup
