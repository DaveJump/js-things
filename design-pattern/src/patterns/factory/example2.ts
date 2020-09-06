/**
 * Abstract factory
 */

enum RifleType {
  AK47,
  sniperRifle
}

interface RifleShootable {
  aim(): Rifle
  shoot(): Rifle
}

abstract class Bullet {
  abstract name: string
}

class RifleBullet extends Bullet {
  name: string = 'RifleBullet'
}

abstract class Scope {
  abstract rate: number
}

class RifleScope extends Scope {
  rate!: number

  constructor(rate: number) {
    super()
    this.rate = rate
  }
}

abstract class Rifle implements RifleShootable {
  private _bullet: Bullet | undefined
  private _scope: Scope | undefined
  addBullet(bullet: Bullet): Rifle {
    this._bullet = bullet
    return this
  }
  addScope(scope?: Scope): Rifle {
    this._scope = scope
    return this
  }

  abstract aim(): Rifle
  abstract shoot(): Rifle
}

class AK47 extends Rifle {
  aim() {
    console.log('AK47 locked target')
    return this
  }
  shoot() {
    console.log('AK47 shooting...')
    return this
  }
}

// to extend a rifle type
class SniperRifle extends Rifle {
  aim() {
    console.log('SniperRifle locked target')
    return this
  }
  shoot() {
    console.log('M4A1 shooting...')
    return this
  }
}

abstract class ArmFactory {
  abstract createRifle(): Rifle
  abstract createBullet(): Bullet
}

class AK47RifleFactory extends ArmFactory {
  private clean(rifle: AK47) {
    console.log('clean AK47.')
  }
  private applyTungOil(rifle: AK47) {
    console.log('apply tung oil.')
  }
  createRifle(): AK47 {
    const rifle = new AK47()
    this.clean(rifle)
    this.applyTungOil(rifle)
    return rifle
  }
  createBullet(): Bullet {
    return new RifleBullet()
  }
}

class SniperRifleFactory extends ArmFactory {
  private clean(rifle: SniperRifle) {
    console.log('clean SniperRifle.')
  }
  private sprayPaint(rifle: SniperRifle) {
    console.log('spray paint.')
  }
  createRifle(): SniperRifle {
    const rifle = new SniperRifle()
    this.clean(rifle)
    this.sprayPaint(rifle)
    return rifle
  }
  createBullet(): Bullet {
    return new RifleBullet()
  }
  createScope(rate: number): Scope {
    return new RifleScope(rate)
  }
}

function prepare<T extends Rifle>(rifle: T, bullet: Bullet, scope?: Scope): T {
  rifle.addBullet(bullet)
  if (scope) {
    rifle.addScope(scope)
  }
  return rifle
}

const ak47Factory = new AK47RifleFactory()
const ak47 = ak47Factory.createRifle()
const bullet = ak47Factory.createBullet()
prepare(ak47, bullet).shoot()

const sniperRifleFactory = new SniperRifleFactory()
const sniperRifle = sniperRifleFactory.createRifle()
const largeBullet = sniperRifleFactory.createBullet()
const scope = sniperRifleFactory.createScope(4)
prepare(sniperRifle, largeBullet, scope).aim().shoot()
