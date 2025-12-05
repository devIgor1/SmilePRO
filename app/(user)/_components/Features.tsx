"use client";

import { Calendar, Users, BarChart3, Clock, Shield, Zap } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
export function Features() {
  return (
    <section id="features" className="border-t bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-bold text-3xl text-balance md:text-4xl">
            Tudo que você precisa para administrar sua clínica
          </h2>
          <p className="text-muted-foreground mt-4 text-balance text-lg">
            Recursos poderosos projetados para economizar tempo e melhorar o
            atendimento ao paciente
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                <Calendar className="size-6" />
              </div>
              <CardTitle>Agendamento Inteligente</CardTitle>
              <CardDescription>
                Visualização intuitiva do calendário com gerenciamento fácil de
                agendamentos e reserva online pública para seus pacientes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                <Users className="size-6" />
              </div>
              <CardTitle>Gestão de Pacientes</CardTitle>
              <CardDescription>
                Perfis completos de pacientes com informações de contato,
                observações, fotos e histórico completo de agendamentos
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                <BarChart3 className="size-6" />
              </div>
              <CardTitle>Análises e Insights</CardTitle>
              <CardDescription>
                Acompanhe tendências de receita, monitore estatísticas de
                agendamentos e visualize métricas-chave de desempenho
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                <Clock className="size-6" />
              </div>
              <CardTitle>Gestão de Serviços</CardTitle>
              <CardDescription>
                Crie e gerencie os serviços da sua clínica com preços, duração e
                configurações de disponibilidade
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                <Shield className="size-6" />
              </div>
              <CardTitle>Seguro e Confiável</CardTitle>
              <CardDescription>
                Autenticação segura, proteção de dados e infraestrutura
                confiável para manter os dados da sua clínica seguros
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-lg">
                <Zap className="size-6" />
              </div>
              <CardTitle>Fácil de Usar</CardTitle>
              <CardDescription>
                Interface simples e intuitiva projetada para profissionais
                odontológicos. Comece em minutos sem necessidade de treinamento
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
