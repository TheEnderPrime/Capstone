TEX = pdflatex
TEX_TARGET = SawyerProblemStatement
TEX_SOURCE = ${TEX_TARGET}.tex


default:	pdf

pdf:		ps
		ps2pdf ${TEX_TARGET}.ps
		rm -f ${TEX_TARGET}.aux
		rm -f ${TEX_TARGET}.toc
		rm -f ${TEX_TARGET}.log
		rm -f ${TEX_TARGET}.dvi
		rm -f ${TEX_TARGET}.ps

ps: 		dvi
		dvips -R -Poutline -t letter ${TEX_TARGET}.dvi -o ${TEX_TARGET}.ps

dvi:		${TEX_TARGET}.tex 
		# run latex twice to get references correct
		latex ${TEX_TARGET}.tex
		latex $(TEX_TARGET).tex

tarball: 	pdf
		tar -cvjf CS444_group4.tar.bz2 ${TEX_SOURCE} ${TEX_TARGET}.pdf makefile

.PHONY: clean

clean:
		rm -f ${TEX_TARGET}.{aux,toc,log,dvi,ps,pdf,out}
		rm -f ${PTARGET}
		rm -f ${FTARGET}