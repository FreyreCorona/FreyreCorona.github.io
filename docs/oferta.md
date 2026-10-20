# Oferta productizada — Freyre Cloud Ops

> Documento de trabajo. Define paquetes, alcance, precios y guion de venta.
> Mercado: Brasil (BRL). Posicionamiento: Platform Engineering fraccional.

---

## 0. Punto de partida real

| | |
|---|---|
| **Clientes actuales** | 0 |
| **Ingreso base** | Empleo fijo CNPJ · R$ 12.000/mês |
| **Tiempo disponible** | 5–10 h/semana |
| **Caja para arrancar** | 0 (solo tiempo) |

### Lo que esto significa (y las implicancias de cada cosa)

**Consecuencia 1 — el cuello de botella NO es el precio, es el primer cliente.**
Ningún ajuste de tarifa importa hasta que exista una sola persona que te pague.
El objetivo del mes 1 es **un cliente**, no un ingreso.

**Consecuencia 2 — el sueldo fijo es una ventaja competitiva, no un colchón
pasivo.** Como no necesitás facturar para vivir:
- No aceptás clientes malos por desesperación.
- No bajás precios para cerrar (podés esperar al que sí paga).
- Podés ofrecer algo que un proveedor necesitado no puede: **estabilidad**. Un
  retainer de infraestructura vale más cuando el proveedor no desaparece.
- **Usalo en el discurso de venta**: *"no dependo de esto para vivir, así que
  no te voy a dejar tirado ni te voy a vender de más"*. Es un argumento real.

**Consecuencia 3 — el riesgo es distinto al que pensabas.** No es "¿voy a
ganar?", es "¿voy a perder el tiempo sin cerrar nada?". Por eso la ruta de
abajo prioriza **conversaciones** sobre perfeccionamiento del producto.

**Consecuencia 4 — la meta realista de los primeros 90 días son 2 retainers.**
R$1.380/mês recurrentes con ~8–12 h/mes de trabajo. No es un sueldo, es la
**prueba de que el modelo funciona**. A partir de ahí se decide escalar.

---

## 1. Principio rector

**El retainer es el negocio. Los proyectos son la puerta de entrada.**

```
   PROYECTO (entrada)          →   RETAINER (recurrencia)
   ─────────────────────           ─────────────────────
   Resuelvo algo urgente           Me quedo cuidando que siga bien
   Cobro una vez                   Cobro cada mes
   Fácil de vender                 Difícil de vender, fácil de mantener
   Financia el mes                 Construye el activo
```

Todo el embudo apunta al plan mensual. Un proyecto sin retainer detrás es una
venta que hay que repetir; un retainer es ingreso que ya está vendido el mes
siguiente.

**Restricción de diseño:** 5–10 h/semana. Eso significa que el retainer debe
ser **altamente automatizable** (lo que ya hago: monitoreo, backups, alertas)
y con **pocas horas de intervención humana**. Los paquetes de muchas horas
manuales no caben en tu agenda actual.

---

## 2. Los 3 paquetes

### 🟦 PAQUETE 1 — Diagnóstico Cloud
**Tipo:** Proyecto puntual (entrada)
**Precio: R$ 1.900** (fixo)

| | |
|---|---|
| **Para quién** | SMB o agencia que sospecha que su infra gasta de más o tiene riesgos, pero no sabe dónde. |
| **Qué incluye** | Revisión de infraestructura (AWS/OCI), factura de los últimos 3 meses, seguridad básica, backups, puntos únicos de falla. |
| **Entregable** | Informe con hallazgos priorizados + plan de acción con estimación de ahorro. Sesión de 60 min para presentarlo. |
| **Duración** | 3–5 días |
| **Tu esfuerzo** | ~8–12 h |
| **Precio/hora implícito** | ~R$ 160–240/h |

**Por qué este precio:** coincide con la franja "DevOps sénior" (R$170–260/h)
y es lo bastante bajo para ser una decisión sin comité. Es también el imán de
clientes: quien paga R$1.900 por un diagnóstico ya demostró que tiene
presupuesto y confía en vos.

**Puerta de entrada:** al final del informe, el CTA es natural →
*"¿Quieres que yo implemente las mejoras y me quede monitoreando?"*

---

### 🟩 PAQUETE 2 — Deploy Pipeline
**Tipo:** Proyecto puntual
**Precio: R$ 4.900** (fixo)

| | |
|---|---|
| **Para quién** | Equipo que deploya manual, lento o con miedo. |
| **Qué incluye** | CI/CD con GitHub Actions, contenedores si hacen falta, entornos de staging, rollback confiable, infraestructura como código (Terraform) para lo esencial. |
| **Entregable** | Pipeline funcionando + documentación + capacitación al equipo (1 sesión). |
| **Duración** | 2–4 semanas |
| **Tu esfuerzo** | ~20–30 h |
| **Precio/hora implícito** | ~R$ 165–245/h |

**Por qué este precio:** una migración/setup DevOps bien hecho en el mercado
brasileño arranca en R$5k. Cobrar R$4.900 te posiciona como accesible frente a
consultoras (que cobran R$15k+) sin regalarte.

**Puerta de entrada:** el pipeline queda vivo y hay que mantenerlo →
*"Ahora que deployás con confianza, ¿querés que me encargue de que no se caiga
ni te sorprenda la factura?"*

---

### 🟪 PAQUETE 3 — Cloud Ops Mensal ⭐
**Tipo:** Retainer (el corazón del negocio)
**Precio: R$ 1.200 de setup + R$ 690/mês**

| | |
|---|---|
| **Para quién** | SMB o agencia que ya tiene algo en producción y no quiere pensar en infra. |
| **Qué incluye** | Monitoreo 24/7 (uptime + recursos), alertas a WhatsApp, backups automáticos verificados, actualizaciones de seguridad, SSL, revisión mensual de costos, soporte prioritario por WhatsApp. |
| **Entregable** | Un panel de estado + informe mensual de 1 página + tranquilidad. |
| **Tu esfuerzo** | ~4–6 h/mes después del setup |
| **Precio/hora implícito** | ~R$ 115–170/h (y cae con cada cliente que se suma) |

**Por qué este precio:** el referente directo del mercado es un consultor AWS
independiente cobrando **US$1.620/mês** (~R$9.400) por soporte gestionado.
R$690 es una fracción — porque no incluyo guardia 24/7 humana, sino monitoreo
automatizado con intervención en horario comercial. Es honesto y sostenible.

**Escalado del retainer:**

| Nivel | Alcance | Precio |
|---|---|---|
| **Essencial** | 1 servidor / 1 app, monitoreo + backup + SSL | R$ 490/mês |
| **Padrão** | Hasta 3 servicios, + revisión de costos + soporte prioritario | R$ 690/mês |
| **Avançado** | Infra completa, + optimización continua, + 2h de mejoras/mes | R$ 1.200/mês |

> **Estrategia de escalado:** empiezo a todos en el Essencial o Padrão. El
> cliente sube de nivel solo cuando crece o cuando pide algo extra. Nunca
> vendo el tope de entrada.

---

## 3. Cómo encaja con los servicios actuales de la landing

Los 4 servicios que hoy están en la web **no desaparecen**: se vuelven el
"qué hay adentro" de los paquetes.

| Servicio actual (landing) | Vive dentro de |
|---|---|
| Auditoría Cloud | → Diagnóstico Cloud |
| Implementación DevOps | → Deploy Pipeline |
| Platform Engineering Fraccional | → Cloud Ops Mensal |
| Arquitectura Backend | → Servicio extra (a medida, cotizado aparte) |

**Cambio concreto en la landing:**
1. El hero cambia de `Diagnóstico gratuito` → `Ver paquetes`. Ya no se regala
   nada: el diagnóstico es un producto de R$1.900.
2. Nueva sección **"Paquetes"** entre Servicios y Proceso, con los 3 precios.
3. La sección Servicios se mantiene como "capacidades" (el detalle técnico),
   pero pierde el peso de CTA.
4. El formulario de contacto deja de decir "la conversación inicial es gratis y
   sin compromiso" como oferta central; pasa a ser **"te respondo con el
   paquete que encaja con tu caso"**.

> **Nota para el primer cliente:** como no hay casos de este servicio
> específico todavía (los testimonios son de desarrollo y auditoría, que sí
> son reales), la primera versión de la sección Paquetes **no debe inventar
> logos ni métricas de Cloud Ops**. Los testimonios actuales se mantienen tal
> cual, porque son verdad.

---

## 4. Guion de venta (WhatsApp / primera llamada)

El error clásico es preguntar *"¿en qué te puedo ayudar?"*. Eso te devuelve
una consultoría gratis y ninguna venta. El guion correcto **califica rápido**:

```
1. ¿Qué tenés hoy en infra? (AWS, OCI, VPS, on-premise)
2. ¿Está en producción con usuarios reales?
3. ¿Quién lo cuida hoy? (vos, un dev, nadie)
4. ¿Qué te duele más: la factura, el miedo a que se caiga, o que no podés deployar?
   → esto define el paquete
5. ¿Tenés presupuesto mensual para infra, o solo para un proyecto puntual?
   → esto define si vendés retainer o proyecto
```

**Regla de oro:** si la respuesta a la #5 es "solo puntual", vendés el
Diagnóstico o el Deploy, y sembrás el retainer para después. Si es "mensual",
vas directo al Cloud Ops y el diagnóstico es el regalo que cierra la venta.

### Plantilla de primer mensaje (LinkedIn / WhatsApp / email)

No vendas. Preguntá. El objetivo es **iniciar una conversación**, no cerrar.

```
Hola [nombre], ¿cómo va? Vi que [contexto real: trabajás en X, tu equipo
creció, etc.]. Estoy armando un servicio de cuidado de infraestructura cloud
para equipos chicos — monitoreo, backups y costos, sin que nadie tenga que
pensar en eso.

No te quiero vender nada ahora: estoy hablando con gente de producto para
entender cómo manejan hoy ese tema. ¿Quién se ocupa de la infra en [empresa],
y qué es lo que más les molesta — costos, caídas, o deploys?

Si preferís, te muestro los 3 paquetes que armé y me decís qué te parece.
```

**Qué hace bien este mensaje:**
- No pide nada (baja la guardia).
- Hace una pregunta concreta y fácil de responder.
- Cuenta que estás empezando (honesto, y activa la simpatía del contacto).
- Deja una puerta abierta hacia los paquetes sin empujar.

**Errores a evitar:**
- ❌ "Soy experto en Cloud con 6 años de experiencia..." → nadie lo lee.
- ❌ Un audio de 3 minutos o un bloque de 15 líneas.
- ❌ Pedir una llamada de 30 min en el primer mensaje.

---

## 5. Ruta desde cero (cero clientes → primer retainer)

La tabla de "economía a 12 meses" que estaba acá era optimista: asumía una
base de clientes que todavía no existe. Esto es la ruta real, por fases.

### Fase 0 — Preparación (semana 1)
No es vender. Es tener con qué vender.
- [ ] Landing con la sección "Paquetes" publicada (precios visibles).
- [ ] Perfil de LinkedIn actualizado: headline con "Cloud & Platform
      Engineering", enlace a freyre.dev.
- [ ] Google Meu Negócio creado.
- [ ] Lista de 20 contactos reales (ex-colegas, Colmena Tech, Ciberiuz,
      Athletica, contactos de LinkedIn).

### Fase 1 — Conversaciones (semanas 2–4) ← **acá se define todo**
La meta no es vender, es **hablar con 20 personas**.
- 5 mensajes/día, personalizados, sin pitch.
- No ofrecer "consultoría". Ofrecer **el Diagnóstico Cloud** como algo concreto
  y acotado.
- Preguntar por su infra actual, no contar lo que sabés.

> **Métrica de la fase 1:** 20 conversaciones iniciadas, 5 respuestas reales.
> Si no hay conversaciones, el problema es el mensaje o la lista, no el precio.

### Fase 2 — Primer proyecto (mes 2)
De las conversaciones sale **un** Diagnóstico (R$1.900) o **un** Deploy
(R$4.900). Se entrega impecable. Al entregar, se siembra el retainer.

> **Métrica de la fase 2:** 1 proyecto pagado.

### Fase 3 — Primer retainer (mes 2–3)
El primer cliente que dudaba, después de ver el trabajo real, acepta el
**Cloud Ops Padrão (R$690/mês)**.

> **Métrica de la fase 3:** R$ 690/mês recurrentes. **Este es el hito que
> importa.** Un retainer prueba el modelo; diez lo escalan.

### Fase 4 — Repetir (mes 3–6)
Con un caso de éxito documentado (número real, testimonio), el segundo y
tercer cliente son más fáciles. La meta de 90 días:

| Hito | Objetivo |
|---|---|
| Conversaciones iniciadas | 20+ |
| Proyectos vendidos | 1–2 |
| **Retainers activos** | **2** |
| **Ingreso recurrente** | **R$ 1.380/mês** |
| Tiempo consumido | ~10 h/mes |

### Después del mes 6 (referencia, no promesa)

| Escenario | Clientes | Ingreso recurrente |
|---|---|---|
| Conservador | 3 Essencial + 2 Padrão | R$ 2.850/mês |
| Bueno | 4 Essencial + 4 Padrão + 1 Avançado | R$ 4.960/mês |
| Óptimo | 6 Essencial + 8 Padrão + 3 Avançado | R$ 11.900/mês |

Con 1 proyecto puntual cada 1–2 meses sumando R$1.900–4.900 encima.

> El salto no viene de cobrar más caro, viene de **sumar el retainer N+1 sin
> perder los anteriores**. Por eso la Fase 1 (conversaciones) es la única que
> no se puede saltear.

---

## 6. Qué NO hacer (para no romper el modelo)

- ❌ **No cobrar por hora al inicio.** El cliente compara horas y negocia.
  Cobrás por resultado empaquetado.
- ❌ **No prometer 24/7 humano.** El monitoreo es 24/7 *automático*; vos
  respondés en horario comercial. Decirlo claro evita expectativas rotas.
- ❌ **No dar el diagnóstico totalmente gratis.** Un "diagnóstico gratuito"
  te llena la agenda de curiosos. Un producto de R$1.900 filtra y te paga.
- ❌ **No mezclar los 3 paquetes en una lista de 4 servicios sueltos.** La
  cabeza del cliente necesita 3 opciones, no 4 capacidades.
- ❌ **No bajar el precio para ganar la venta.** Bajás una vez y ya no subís
  nunca. Si no llega el presupuesto, achicás el alcance, no el precio.
