import resolveConfig from 'tailwindcss/resolveConfig';
import config, { colors } from '../../tailwind.config';

const { theme } = resolveConfig(config);

export { colors };
export default theme;
