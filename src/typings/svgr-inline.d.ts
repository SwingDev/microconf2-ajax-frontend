declare module '*.svg?inline' {
  const component: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
  export default component;
}
