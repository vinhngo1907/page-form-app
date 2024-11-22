"use server";

import { currentUser } from "@clerk/nextjs";
import prisma from "@lib/prisma";
import { formSchema, formSchemaType } from "@schemas/form";

class UserNotFoundErr extends Error { }

export async function GetFormStats() {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundErr();
    }

    const stats = await prisma.form.aggregate({
        where: {
            userId: user.id
        },
        _sum: {
            visits: true,
            submissions: true
        }
    });

    // Extract values or default to 0
    const submissions = stats._sum?.submissions || 0;
    const visits = stats._sum?.visits || 0;

    // Calculate rates
    const submissionRate = visits > 0 ? (submissions / visits) * 100 : 0;
    const bounceRate = 100 - submissionRate;

    return {
        submissions,
        visits,
        submissionRate,
        bounceRate
    };
}

export async function GetFormById(id: number) {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundErr();
    }

    return await prisma.form.findFirstOrThrow({
        where: {
            userId: user.id,
            id,
        },
    });
}

export async function submitForm(formUrl: string, content: string) {
    return await prisma.form.update({
        data: {
            submissions: {
                increment: 1,
            },
            FormSubmissions: {
                create: {
                    content,
                },
            },
        },
        where: {
            shareUrl: formUrl,
            // published: true,
        },
    });
}

export async function GetForms() {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundErr();
    }

    return await prisma.form.findMany({
        where: {
            // userId: parseInt(user.id, 10),
            userId: user.id
        },
        orderBy: {
            createdAt: "desc"
        }
    });
}