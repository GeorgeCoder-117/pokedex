# Pokedex App

Aplicación móvil construida con React Native + Expo para explorar personajes de Pokémon, ver su información detallada y navegar entre pantallas de forma sencilla.

## Descripción general

La app sigue una arquitectura modular basada en pantallas, componentes reutilizables, servicios para consumo de API y tipado fuerte con TypeScript. El objetivo es mantener el código claro, escalable y fácil de extender con nuevas funcionalidades.

## Requisitos previos

Asegúrate de tener instalado:

- Node.js 20 o superior
- npm o yarn
- Expo CLI (si no lo tienes, puedes usarlo a través de npx)

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:

```bash
npm install
```

3. Inicia la aplicación:

```bash
npm start
```

Luego puedes abrirla en un emulador o dispositivo físico con:

```bash
npm run android
```

o

```bash
npm run ios
```

## Arquitectura propuesta

La estructura del proyecto está organizada de forma simple y escalable:

```text
src/
  components/      # Componentes visuales reutilizables
  constants/       # URLs, imágenes y valores estáticos
  hooks/           # Hooks personalizados
  navigation/      # Configuración de rutas y navegación
  screens/         # Pantallas principales de la aplicación
  services/        # Lógica de consumo de APIs y servicios
  types/           # Tipos compartidos de TypeScript
```

### Flujo de la app

- La pantalla principal obtiene la lista de Pokémon desde la API.
- Al seleccionar un Pokémon, se navega a una pantalla de detalle con su información específica.
- Los servicios encapsulan la comunicación con la API y centralizan los errores.
- Los componentes se encargan de la presentación y la interacción visual.

## Decisiones técnicas principales

- TypeScript estricto para reducir errores y mejorar la mantenibilidad.
- React Navigation con Native Stack para navegación entre pantallas de forma nativa y tipada.
- Separación entre servicios, pantallas y componentes para mantener el código limpio.
- Uso de hooks para manejar estado, carga y reintento de peticiones.
- Alias de rutas con @/ para simplificar imports y evitar rutas relativas largas.
- Manejo explícito de estados de carga y error para mejorar la experiencia de usuario.

## Librerías utilizadas y por qué

### React Native + Expo
- Base del proyecto para desarrollar una app móvil multiplataforma.
- Permite ejecutar la app en Android, iOS y web con una misma base de código.

### @react-navigation/native y @react-navigation/native-stack
- Gestionan la navegación entre pantallas.
- Resuelven la navegación de forma nativa y con soporte para rutas tipadas.

### axios
- Facilita las peticiones HTTP de forma limpia y centralizada.
- Ayuda a encapsular la lógica de consumo de API y a manejar errores en un solo lugar.

### expo-image
- Mejora la carga y renderizado de imágenes en React Native.
- Optimiza la experiencia visual cuando se muestran imágenes de Pokémon.

### expo-linear-gradient
- Permite crear fondos visuales más atractivos y modernos.
- Se emplea para mejorar la presentación de los detalles del Pokémon.

### @expo/vector-icons
- Proporciona iconografía consistente y lista para usar en botones y encabezados.
- Reduce el tiempo de desarrollo visual.

### react-native-safe-area-context
- Asegura que la interfaz se renderice correctamente con los márgenes seguros de dispositivos modernos.
- Evita problemas de superposición con notch, barras de estado y pantallas curvas.

### @react-native-async-storage/async-storage
- Librería ligera para almacenamiento local persistente resulta útil para caché, preferencias de usuario y datos que deben mantenerse entre sesiones.

### react-native-mmkv
- Librería ligera para almacenamiento local persistente para usar con expo-builds cuando sea necesario.

## Problemas que resuelven estas decisiones

- Separar servicios de UI evita que la lógica de red se mezcle con la presentación.
- El manejo de carga y error mejora la robustez ante fallas de red o respuestas inesperadas.
- La navegación tipada reduce errores al movernos entre pantallas.
- Las imágenes optimizadas mejoran el rendimiento y la experiencia visual.
- El almacenamiento local con MMKV permite escalar la app sin depender completamente de la red.

## Siguientes pasos recomendados

- Implementar caché con MMKV en una expo-build.
- Agregar búsqueda o filtros por tipo o generación.
- Incorporar favoritos y guardado local de Pokémon seleccionados.
- Mejorar el diseño de la pantalla inicial de bienvenida con más estadísticas visuales.
