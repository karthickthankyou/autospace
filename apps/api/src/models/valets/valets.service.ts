import { BadRequestException, Injectable } from '@nestjs/common'
import { FindManyValetArgs, FindUniqueValetArgs } from './dto/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateValetInput } from './dto/create-valet.input'
import { UpdateValetInput } from './dto/update-valet.input'
import { AuthService } from 'src/common/auth/auth.service'

@Injectable()
export class ValetsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
  ) {}
  async create(
    { displayName, email, image, password, licenceID }: CreateValetInput,
    companyId: number,
  ) {
    // Todo: We can generate password and send it to the registered email.
    const user = await this.auth.register({ email, password, displayName })
    return this.prisma.valet.create({
      data: { displayName, uid: user.uid, image: image, companyId, licenceID },
    })
  }

  findAll(args: FindManyValetArgs) {
    return this.prisma.valet.findMany(args)
  }

  async validValet(uid: string) {
    const valet = await this.prisma.valet.findUnique({
      where: { uid: uid },
    })
    if (!valet) {
      throw new BadRequestException('You are not a valet.')
    }
    return valet
  }

  findOne(args: FindUniqueValetArgs) {
    return this.prisma.valet.findUnique(args)
  }

  update(updateValetInput: UpdateValetInput) {
    const { uid, ...data } = updateValetInput
    return this.prisma.valet.update({
      where: { uid },
      data: data,
    })
  }

  remove(args: FindUniqueValetArgs) {
    return this.prisma.valet.delete(args)
  }
}
